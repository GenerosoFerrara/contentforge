import React from 'react';
import styles from './HistoryPanel.module.css';
import { CONTENT_TYPES } from '../utils/prompts';

function typeLabel(val) {
  return CONTENT_TYPES.find(t => t.value === val)?.label || val;
}

export default function HistoryPanel({ history, onSelect, onClear }) {
  if (history.length === 0) {
    return (
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.title}>History</span>
        </div>
        <p className={styles.empty}>No generations yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>History ({history.length})</span>
        <button className={styles.clearBtn} onClick={onClear}>Clear</button>
      </div>
      <ul className={styles.list}>
        {history.map((item, i) => (
          <li key={i} className={styles.item} onClick={() => onSelect(item)}>
            <div className={styles.itemHeader}>
              <span className={styles.badge}>{typeLabel(item.type)}</span>
              <span className={styles.time}>{item.time}</span>
            </div>
            <p className={styles.product}>{item.product}</p>
            <p className={styles.preview}>{item.output.slice(0, 80)}…</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
