import React, { useState } from 'react';
import styles from './OutputPanel.module.css';

export default function OutputPanel({ output, loading, error }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = 'content.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Generated content</span>
        {output && (
          <div className={styles.actions}>
            <button className={styles.actionBtn} onClick={handleCopy}>
              {copied ? '✓ Copied' : 'Copy'}
            </button>
            <button className={styles.actionBtn} onClick={handleDownload}>
              ↓ .txt
            </button>
          </div>
        )}
      </div>

      <div className={styles.outputWrap}>
        {loading && (
          <div className={styles.loadingState}>
            <div className={styles.dots}>
              <span /><span /><span />
            </div>
            <p className={styles.loadingText}>Claude is writing…</p>
          </div>
        )}

        {error && !loading && (
          <div className={styles.errorState}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        {!loading && !error && output && (
          <pre className={styles.output}>{output}</pre>
        )}

        {!loading && !error && !output && (
          <div className={styles.emptyState}>
            <p className={styles.emptyIcon}>✦</p>
            <p className={styles.emptyText}>Your generated content will appear here.</p>
            <p className={styles.emptySub}>Fill in the form and click Generate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
