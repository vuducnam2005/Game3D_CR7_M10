import * as THREE from 'three';

export interface AnimationPlaybackState {
  current: string | null;
  paused: boolean;
  queued: string[];
  speed: number;
}

export interface AnimationFrame {
  request?: number;
  name: string | null;
  time: number;
  duration: number;
  paused: boolean;
}

interface PlayOptions {
  request?: number;
  loop?: boolean;
  queue?: boolean;
  fadeSeconds?: number;
}

interface QueuedAnimation {
  name: string;
  options: PlayOptions;
}

export class AnimationManager {
  private readonly mixer: THREE.AnimationMixer;
  private readonly actions = new Map<string, THREE.AnimationAction>();
  private readonly queue: QueuedAnimation[] = [];
  private readonly cooldowns = new Map<string, number>();
  private readonly fadingActions = new Map<THREE.AnimationAction, number>();
  private currentAction: THREE.AnimationAction | null = null;
  private currentName: string | null = null;
  private currentRequest = 0;
  private currentIsOneShot = false;
  private paused = false;
  private speed = 1;
  private readonly finishedListener: (event: THREE.Event & { action: THREE.AnimationAction }) => void;

  constructor(
    private readonly root: THREE.Object3D,
    clips: THREE.AnimationClip[],
    private readonly idleName: string,
    private readonly onStateChange?: (state: AnimationPlaybackState) => void,
  ) {
    this.mixer = new THREE.AnimationMixer(root);
    for (const animationClip of clips) {
      this.actions.set(animationClip.name, this.mixer.clipAction(animationClip));
    }
    this.finishedListener = event => this.handleFinished(event.action);
    this.mixer.addEventListener('finished', this.finishedListener);
  }

  get clipNames(): string[] {
    return [...this.actions.keys()];
  }

  get frame(): AnimationFrame {
    return {
      request: this.currentRequest,
      name: this.currentName,
      time: this.currentAction?.time ?? 0,
      duration: this.currentAction?.getClip().duration ?? 0,
      paused: this.paused,
    };
  }

  play(name: string, options: PlayOptions = {}): 'played' | 'queued' | 'ignored' {
    if (!this.actions.has(name)) return 'ignored';
    const now = performance.now();
    const lastPlayed = this.cooldowns.get(name) ?? Number.NEGATIVE_INFINITY;
    if (options.queue !== false && now - lastPlayed < 250) return 'ignored';
    this.cooldowns.set(name, now);

    const shouldQueue = options.queue ?? true;
    if (this.currentIsOneShot && shouldQueue) {
      if (this.queue.length >= 4) return 'ignored';
      if (!this.queue.some(item => item.name === name)) {
        this.queue.push({ name, options });
        this.emitState();
      }
      return 'queued';
    }

    this.playNow(name, options);
    return 'played';
  }

  setPaused(paused: boolean): void {
    this.paused = paused;
    this.mixer.timeScale = paused ? 0 : this.speed;
    this.emitState();
  }

  clearQueue(): void {
    this.queue.length = 0;
    this.emitState();
  }

  setSpeed(speed: number): void {
    this.speed = THREE.MathUtils.clamp(speed, 0.1, 2.5);
    if (!this.paused) this.mixer.timeScale = this.speed;
    this.emitState();
  }

  update(deltaSeconds: number): void {
    this.mixer.update(deltaSeconds);
    for (const [action, endTime] of this.fadingActions) {
      if (this.mixer.time >= endTime) {
        if (action !== this.currentAction) action.stop();
        this.fadingActions.delete(action);
      }
    }
  }

  seek(name: string, time: number): void {
    const action = this.actions.get(name);
    if (!action || !Number.isFinite(time)) return;
    this.queue.length = 0;
    this.fadingActions.clear();
    this.mixer.stopAllAction();
    this.playNow(name, { loop: false, queue: false, fadeSeconds: 0 });
    action.time = THREE.MathUtils.clamp(time, 0, Math.max(0, action.getClip().duration - 0.00001));
    this.setPaused(true);
    this.mixer.update(0);
  }

  dispose(): void {
    this.mixer.removeEventListener('finished', this.finishedListener);
    this.mixer.stopAllAction();
    this.mixer.uncacheRoot(this.root);
    this.actions.clear();
    this.queue.length = 0;
    this.fadingActions.clear();
  }

  private playNow(name: string, options: PlayOptions): void {
    const nextAction = this.actions.get(name);
    if (!nextAction) return;
    const loop = options.loop ?? (name === this.idleName || name === 'mixamo.com');
    const fadeSeconds = options.fadeSeconds ?? 0.28;

    if (this.currentAction && this.currentAction !== nextAction) {
      if (fadeSeconds > 0) {
        this.currentAction.fadeOut(fadeSeconds);
        this.fadingActions.set(this.currentAction, this.mixer.time + fadeSeconds);
      } else {
        this.currentAction.stop();
      }
    }

    this.fadingActions.delete(nextAction);
    nextAction.enabled = true;
    nextAction.reset();
    nextAction.setEffectiveTimeScale(1);
    nextAction.setEffectiveWeight(1);
    nextAction.clampWhenFinished = !loop;
    nextAction.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Number.POSITIVE_INFINITY : 1);
    if (fadeSeconds > 0) nextAction.fadeIn(fadeSeconds);
    else nextAction.stopFading();
    nextAction.play();

    this.currentAction = nextAction;
    this.currentName = name;
    this.currentRequest = options.request ?? 0;
    this.currentIsOneShot = !loop;
    this.emitState();
  }

  private handleFinished(action: THREE.AnimationAction): void {
    if (action !== this.currentAction || !this.currentIsOneShot) return;
    const next = this.queue.shift();
    if (next) {
      this.playNow(next.name, next.options);
      return;
    }
    this.playNow(this.idleName, { loop: true, queue: false });
  }

  private emitState(): void {
    this.onStateChange?.({
      current: this.currentName,
      paused: this.paused,
      queued: this.queue.map(item => item.name),
      speed: this.speed,
    });
  }
}
