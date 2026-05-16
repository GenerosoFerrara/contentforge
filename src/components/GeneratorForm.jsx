import React, { useState } from 'react';
import { CONTENT_TYPES, TONES, LANGUAGES } from '../utils/prompts';
import styles from './GeneratorForm.module.css';

const DEFAULT = {
  type:     'product_description',
  product:  '',
  category: '',
  price:    '',
  tone:     'professional',
  language: 'English',
  extra:    '',
};

export default function GeneratorForm({ onGenerate, loading }) {
  const [form, setForm] = useState(DEFAULT);

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.product.trim()) return;
    onGenerate(form);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>Content type</label>
          <select className={styles.select} value={form.type} onChange={e => set('type', e.target.value)}>
            {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Tone</label>
          <select className={styles.select} value={form.tone} onChange={e => set('tone', e.target.value)}>
            {TONES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Language</label>
          <select className={styles.select} value={form.language} onChange={e => set('language', e.target.value)}>
            {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.row}>
        <div className={`${styles.field} ${styles.grow2}`}>
          <label className={styles.label}>Product name <span className={styles.required}>*</span></label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Wireless Headphones Pro X200"
            value={form.product}
            onChange={e => set('product', e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. Electronics"
            value={form.category}
            onChange={e => set('category', e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Price</label>
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. €129.99"
            value={form.price}
            onChange={e => set('price', e.target.value)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Extra details <span className={styles.opt}>(optional)</span></label>
        <input
          className={styles.input}
          type="text"
          placeholder="e.g. waterproof, 40h battery, noise cancelling, comes in black and white"
          value={form.extra}
          onChange={e => set('extra', e.target.value)}
        />
      </div>

      <button className={styles.btn} type="submit" disabled={loading || !form.product.trim()}>
        {loading ? (
          <span className={styles.spinner}>Generating…</span>
        ) : (
          '✦ Generate content'
        )}
      </button>
    </form>
  );
}
