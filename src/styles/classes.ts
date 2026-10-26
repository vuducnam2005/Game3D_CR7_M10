import styles from './ModelDebug.module.css';

export function css(names: string): string {
  return names.split(/\s+/).filter(Boolean).map(name => styles[name] ?? name).join(' ');
}
