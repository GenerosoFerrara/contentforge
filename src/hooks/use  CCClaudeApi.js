import { useState, useCallback } from 'react';
import { buildPrompt } from '../utils/prompts';

const MODEL = 'gemini-2.0-flash';

export function useClaudeApi() {
  const [output,  setOutput]  = useState('');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const generate = useCallback(async (formData) => {
    const apiKey = process.env.REACT_APP_CLAUDE_KEY;
    if (!apiKey) {
      setError('Missing API key. Add REACT_APP_CLAUDE_KEY to your .env file.');
      return;
    }

    setLoading(true);
    setError(null);
    setOutput('');

    const prompt = buildPrompt(formData);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { maxOutputTokens: 1024 },
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `HTTP ${res.status}`);
      }

      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      setOutput(text);
      return text;
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { output, loading, error, generate, setOutput };
}