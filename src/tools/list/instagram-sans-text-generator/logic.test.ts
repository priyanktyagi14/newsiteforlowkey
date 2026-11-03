import { describe, it, expect } from 'vitest';
import {
  calculateTextStats,
  applyCaseTransform,
  FONT_VARIANTS,
  PREVIEW_THEMES,
  SAMPLE_TEXTS
} from './logic';

describe('Instagram Sans Text Generator - Logic', () => {
  describe('calculateTextStats', () => {
    it('handles empty text correctly', () => {
      const stats = calculateTextStats('');
      expect(stats.characters).toBe(0);
      expect(stats.charactersNoSpaces).toBe(0);
      expect(stats.words).toBe(0);
      expect(stats.lines).toBe(0);
      expect(stats.emojis).toBe(0);
    });

    it('calculates stats for standard English sentences', () => {
      const input = 'Hello world from Instagram Sans!';
      const stats = calculateTextStats(input);
      expect(stats.characters).toBe(32);
      expect(stats.charactersNoSpaces).toBe(28);
      expect(stats.words).toBe(5);
      expect(stats.lines).toBe(1);
      expect(stats.emojis).toBe(0);
    });

    it('preserves and calculates multi-line breaks properly', () => {
      const input = "Line 1\nLine 2\n\nLine 4";
      const stats = calculateTextStats(input);
      expect(stats.lines).toBe(4);
      expect(stats.words).toBe(6);
    });

    it('accurately detects and counts emojis', () => {
      const input = "Sunset vibes ✨🌴 and neon dreams 🚀🔥";
      const stats = calculateTextStats(input);
      expect(stats.emojis).toBe(4);
      expect(stats.words).toBe(7);
    });

    it('handles international and non-Latin text (Hindi, Japanese)', () => {
      const hindi = 'नमस्ते दुनिया!';
      const statsHindi = calculateTextStats(hindi);
      expect(statsHindi.words).toBe(2);
      expect(statsHindi.characters).toBeGreaterThan(0);

      const japanese = 'こんにちは世界';
      const statsJp = calculateTextStats(japanese);
      expect(statsJp.characters).toBe(7);
    });

    it('handles very long text strings without performance lag', () => {
      const longText = 'Instagram typography preview. '.repeat(1000);
      const stats = calculateTextStats(longText);
      expect(stats.words).toBe(3000);
      expect(stats.characters).toBe(30000);
    });
  });

  describe('applyCaseTransform', () => {
    it('returns untouched text for "none"', () => {
      const input = 'Hello World 123! ✨';
      expect(applyCaseTransform(input, 'none')).toBe(input);
    });

    it('transforms to uppercase', () => {
      const input = 'Instagram Sans preview';
      expect(applyCaseTransform(input, 'uppercase')).toBe('INSTAGRAM SANS PREVIEW');
    });

    it('transforms to lowercase', () => {
      const input = 'INSTAGRAM SANS preview';
      expect(applyCaseTransform(input, 'lowercase')).toBe('instagram sans preview');
    });

    it('transforms to titlecase', () => {
      const input = 'hello from lowkeydevs team';
      expect(applyCaseTransform(input, 'titlecase')).toBe('Hello From Lowkeydevs Team');
    });

    it('transforms to sentencecase', () => {
      const input = 'hello world. this is great! what do you think?';
      expect(applyCaseTransform(input, 'sentencecase')).toBe('Hello world. This is great! What do you think?');
    });

    it('handles empty or whitespace strings in casing', () => {
      expect(applyCaseTransform('', 'uppercase')).toBe('');
      expect(applyCaseTransform('   ', 'titlecase')).toBe('   ');
    });
  });

  describe('Presets and configurations', () => {
    it('defines all required font variants with matching CSS classes', () => {
      const variantKeys = Object.keys(FONT_VARIANTS);
      expect(variantKeys).toContain('regular');
      expect(variantKeys).toContain('medium');
      expect(variantKeys).toContain('bold');
      expect(variantKeys).toContain('heavy');
      expect(variantKeys).toContain('headline');
      expect(variantKeys).toContain('rounded');
      expect(variantKeys).toContain('script');

      for (const key of variantKeys) {
        const variant = FONT_VARIANTS[key as keyof typeof FONT_VARIANTS];
        expect(variant.name).toBeDefined();
        expect(variant.cssClass).toBeDefined();
        expect(variant.fontWeight).toBeDefined();
      }
    });

    it('defines rich preview themes including Instagram sunset gradient', () => {
      expect(PREVIEW_THEMES.length).toBeGreaterThanOrEqual(4);
      const sunset = PREVIEW_THEMES.find(t => t.id === 'ig-sunset');
      expect(sunset).toBeDefined();
      expect(sunset?.background).toContain('linear-gradient');
    });

    it('provides valid non-empty sample texts', () => {
      expect(SAMPLE_TEXTS.length).toBeGreaterThan(0);
      for (const sample of SAMPLE_TEXTS) {
        expect(sample.length).toBeGreaterThan(5);
      }
    });
  });
});
