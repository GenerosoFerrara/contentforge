import React, { useState, useCallback } from 'react';
import GeneratorForm from './components/GeneratorForm';
import OutputPanel   from './components/OutputPanel';
import HistoryPanel  from './components/HistoryPanel';
import { useClaudeApi } from './hooks/useClaudeApi';
import { getHistory, saveToHistory, clearHistory } from './utils/history';
import styles from './App.module.css';

export default function App() {
  const { output, loading, error, generate, setOutput } = useClaudeApi();
  const [history, setHistory] = useState(getHistory);

  const handleGenerate = useCallback(async (formData) => {
    const result = await generate(formData);
    if (result) {
      const entry = {
        ...formData,
        output: result,
        time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      };
      setHistory(saveToHistory(entry));
    }
  }, [generate]);

  const handleSelectHistory = (item) => {
    setOutput(item.output);
  };

  const handleClearHistory = () => {
    setHistory(clearHistory());
  };

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.logo}>CF</span>
          <div>
            <p className={styles.brandName}>ContentForge</p>
            <p className={styles.brandSub}>AI-powered eCommerce copywriting</p>
          </div>
        </div>
        <div className={styles.poweredBy}>
          Powered by <span className={styles.claude}>Claude AI</span>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.left}>
          <GeneratorForm onGenerate={handleGenerate} loading={loading} />
          <OutputPanel output={output} loading={loading} error={error} />
        </div>
        <div className={styles.right}>
          <HistoryPanel
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
          />
        </div>
      </main>

      <footer className={styles.footer}>
        Built by{' '}
        <a href="https://github.com/GenerosoFerrara" target="_blank" rel="noreferrer">
          Generoso Ferrara
        </a>
        {' '}· React.js · Claude API · Prompt Engineering
      </footer>
    </div>
  );
}
