export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  lines: number;
  emojis: number;
}

export type CaseTransform = 'none' | 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase';

export type FontVariantKey =
  | 'regular'
  | 'medium'
  | 'bold'
  | 'heavy'
  | 'headline'
  | 'rounded'
  | 'script';

export interface FontVariantOption {
  key: FontVariantKey;
  name: string;
  badge: string;
  description: string;
  fontWeight: string;
  fontStyle: string;
  cssClass: string;
  defaultLetterSpacing: string;
}

export interface PreviewTheme {
  id: string;
  name: string;
  background: string;
  color: string;
  border?: string;
  isGradient?: boolean;
}

export const SAMPLE_TEXTS = [
  "✨ Living life in full color.\nCreating moments that matter every single day. 🌴",
  "Design isn't just what it looks like and feels like. Design is how it works. 🚀",
  "Aesthetic vibes, clean typography, and lowkey energy. ✌️\nNew drop coming soon.",
  "नमस्ते दुनिया! Explore beautiful Instagram Sans typography anywhere in the world. 🌍"
];

export const FONT_VARIANTS: Record<FontVariantKey, FontVariantOption> = {
  regular: {
    key: 'regular',
    name: 'Instagram Sans Regular',
    badge: 'Clean',
    description: 'Crisp neo-grotesque sans for everyday captions & bios',
    fontWeight: '400',
    fontStyle: 'normal',
    cssClass: 'font-ig-regular',
    defaultLetterSpacing: '0em'
  },
  medium: {
    key: 'medium',
    name: 'Instagram Sans Medium',
    badge: 'Balanced',
    description: 'Subtle weight increase for enhanced mobile legibility',
    fontWeight: '500',
    fontStyle: 'normal',
    cssClass: 'font-ig-medium',
    defaultLetterSpacing: '-0.01em'
  },
  bold: {
    key: 'bold',
    name: 'Instagram Sans Bold',
    badge: 'Impact',
    description: 'Bold emphasis for prominent titles and highlighted phrases',
    fontWeight: '700',
    fontStyle: 'normal',
    cssClass: 'font-ig-bold',
    defaultLetterSpacing: '-0.015em'
  },
  heavy: {
    key: 'heavy',
    name: 'Instagram Sans Heavy',
    badge: 'Display',
    description: 'Maximum visual weight for punchy short statements',
    fontWeight: '800',
    fontStyle: 'normal',
    cssClass: 'font-ig-heavy',
    defaultLetterSpacing: '-0.02em'
  },
  headline: {
    key: 'headline',
    name: 'Instagram Sans Headline',
    badge: 'Expressive',
    description: 'Geometric squircle curves tailored for Story headers',
    fontWeight: '700',
    fontStyle: 'normal',
    cssClass: 'font-ig-headline',
    defaultLetterSpacing: '-0.025em'
  },
  rounded: {
    key: 'rounded',
    name: 'Instagram Sans Rounded',
    badge: 'Soft',
    description: 'Approachable rounded geometry with warm aesthetics',
    fontWeight: '600',
    fontStyle: 'normal',
    cssClass: 'font-ig-rounded',
    defaultLetterSpacing: '-0.01em'
  },
  script: {
    key: 'script',
    name: 'Instagram Sans Script',
    badge: 'Casual',
    description: 'Organic handwritten cursive style inspired by Stories',
    fontWeight: '600',
    fontStyle: 'italic',
    cssClass: 'font-ig-script',
    defaultLetterSpacing: '0.01em'
  }
};

export const PREVIEW_THEMES: PreviewTheme[] = [
  {
    id: 'dark',
    name: 'Dark Studio',
    background: '#121218',
    color: '#f9fafb',
    border: 'rgba(255, 255, 255, 0.12)'
  },
  {
    id: 'ig-sunset',
    name: 'Instagram Sunset',
    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    color: '#ffffff',
    border: 'transparent',
    isGradient: true
  },
  {
    id: 'cyber-purple',
    name: 'Royal Violet',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #9333ea 100%)',
    color: '#ffffff',
    border: 'transparent',
    isGradient: true
  },
  {
    id: 'midnight',
    name: 'Midnight OLED',
    background: '#000000',
    color: '#ffffff',
    border: 'rgba(255, 255, 255, 0.08)'
  },
  {
    id: 'clean-light',
    name: 'Clean Light',
    background: '#ffffff',
    color: '#0f172a',
    border: 'rgba(0, 0, 0, 0.1)'
  },
  {
    id: 'emerald',
    name: 'Emerald Teal',
    background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0891b2 100%)',
    color: '#ffffff',
    border: 'transparent',
    isGradient: true
  }
];

/**
 * Calculates metrics from user text
 */
export function calculateTextStats(text: string): TextStats {
  const characters = Array.from(text).length;
  const charactersNoSpaces = Array.from(text.replace(/\s/g, '')).length;

  const trimmed = text.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(w => w.length > 0).length : 0;
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0;

  // Regex to detect Unicode Emojis
  const emojiRegex = /[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}\u{1F9B0}-\u{1F9B3}]/gu;
  const emojiMatches = text.match(emojiRegex);
  const emojis = emojiMatches ? emojiMatches.length : 0;

  return {
    characters,
    charactersNoSpaces,
    words,
    lines,
    emojis
  };
}

/**
 * Transforms casing of text while maintaining standard Unicode characters
 */
export function applyCaseTransform(text: string, transform: CaseTransform): string {
  if (!text || transform === 'none') return text;

  switch (transform) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'titlecase':
      return text.replace(/\b\w+/g, word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      });

    case 'sentencecase':
      return text.replace(/(^\s*|\.\s*|\?\s*|!\s*|\n\s*)([a-z\p{Ll}])/gu, (_, prefix, char) => {
        return prefix + char.toUpperCase();
      });

    default:
      return text;
  }
}

/**
 * Robust copy helper with fallback for restricted clipboard permissions
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  if (!text) return false;

  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '-9999px';
    textArea.setAttribute('readonly', '');
    document.body.appendChild(textArea);
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}
