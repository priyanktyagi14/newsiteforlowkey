import type { ToolMeta, ToolCategory } from './definitions';
import { meta as jsonFormatterMeta } from './list/json-formatter/meta';
import { meta as passwordGeneratorMeta } from './list/password-generator/meta';
import { meta as base64ConverterMeta } from './list/base64-converter/meta';
import { meta as characterRemoverMeta } from './list/character-remover/meta';
import { meta as duplicateWordFinderMeta } from './list/duplicate-word-finder/meta';
import { meta as binaryCodeTranslatorMeta } from './list/binary-code-translator/meta';
import { meta as hexToTextConverterMeta } from './list/hex-to-text-converter/meta';
import { meta as htmlToMarkdownConverterMeta } from './list/html-to-markdown-converter/meta';
import { meta as graphqlFormatterMeta } from './list/graphql-formatter/meta';
import { meta as cssFormatterMeta } from './list/css-formatter/meta';
import { meta as jsonStringifyTextMeta } from './list/json-stringify-text/meta';
import { meta as jsonUnstringifierMeta } from './list/json-unstringifier/meta';
import { meta as unicodeToTextConverterMeta } from './list/unicode-to-text-converter/meta';
import { meta as plainTextConverterMeta } from './list/plain-text-converter/meta';
import { meta as onlineNotepadMeta } from './list/online-notepad/meta';
import { meta as uuidGeneratorMeta } from './list/uuid-generator/meta';
import { meta as caseConverterMeta } from './list/case-converter/meta';
import { meta as urlEncoderDecoderMeta } from './list/url-encoder-decoder/meta';
import { meta as epochConverterMeta } from './list/epoch-converter/meta';
import { meta as hashGeneratorMeta } from './list/hash-generator/meta';
import { meta as sentenceCounterMeta } from './list/sentence-counter/meta';
import { meta as sortWordsMeta } from './list/sort-words-alphabetically/meta';
import { meta as findAndReplaceMeta } from './list/find-and-replace-text/meta';
import { meta as removeDuplicateLinesMeta } from './list/remove-duplicate-lines/meta';
import { meta as removeTextFormattingMeta } from './list/remove-text-formatting/meta';
import { meta as repeatTextGeneratorMeta } from './list/repeat-text-generator/meta';
import { meta as reverseTextGeneratorMeta } from './list/reverse-text-generator/meta';
import { meta as invisibleTextGeneratorMeta } from './list/invisible-text-generator/meta';
import { meta as fancyTextGeneratorMeta } from './list/fancy-text-generator/meta';
import { meta as boldTextGeneratorMeta } from './list/bold-text-generator/meta';
import { meta as italicTextGeneratorMeta } from './list/italic-text-generator/meta';
import { meta as underlineTextGeneratorMeta } from './list/underline-text-generator/meta';
import { meta as strikethroughTextGeneratorMeta } from './list/strikethrough-text-generator/meta';
import { meta as bubbleTextGeneratorMeta } from './list/bubble-text-generator/meta';
import { meta as smallTextGeneratorMeta } from './list/small-text-generator/meta';
import { meta as bigTextGeneratorMeta } from './list/big-text-generator/meta';
import { meta as gothicTextGeneratorMeta } from './list/gothic-text-generator/meta';
import { meta as mirrorTextGeneratorMeta } from './list/mirror-text-generator/meta';

// Import newly added tools
import { meta as fontsForInstagramMeta } from './list/fonts-for-instagram/meta';
import { meta as whatsappFontMeta } from './list/whatsapp-font-generator/meta';
import { meta as tiktokFontMeta } from './list/tiktok-font-generator/meta';
import { meta as discordFontMeta } from './list/discord-font-generator/meta';
import { meta as facebookFontMeta } from './list/facebook-font-generator/meta';
import { meta as twitterFontMeta } from './list/twitter-font-generator/meta';
import { meta as cuteFontMeta } from './list/cute-font-generator/meta';
import { meta as unicodeTextConverterMeta } from './list/unicode-text-converter/meta';
import { meta as doubleStruckTextMeta } from './list/double-struck-text/meta';
import { meta as wideTextGeneratorMeta } from './list/wide-text-generator/meta';
import { meta as imageToTextOcrMeta } from './list/image-to-text-ocr/meta';
import { meta as jpgToPngMeta } from './list/jpg-to-png/meta';
import { meta as pngToJpgMeta } from './list/png-to-jpg/meta';
import { meta as jpgToWebpMeta } from './list/jpg-to-webp/meta';
import { meta as webpToJpgMeta } from './list/webp-to-jpg/meta';
import { meta as pngToWebpMeta } from './list/png-to-webp/meta';
import { meta as webpToPngMeta } from './list/webp-to-png/meta';
import { meta as svgToPngMeta } from './list/svg-to-png/meta';
import { meta as imageToAsciiMeta } from './list/image-to-ascii/meta';
import { meta as imageCompressorMeta } from './list/image-compressor/meta';
import { meta as gifGeneratorMeta } from './list/gif-generator/meta';

// New utilities imports
import { meta as camelCaseConverterMeta } from './list/camelcase-converter/meta';
import { meta as kebabCaseConverterMeta } from './list/kebab-case-converter/meta';
import { meta as dotCaseConverterMeta } from './list/dot-case-converter/meta';
import { meta as caesarCipherToolMeta } from './list/caesar-cipher-tool/meta';
import { meta as natoPhoneticAlphabetTranslatorMeta } from './list/nato-phonetic-alphabet-translator/meta';
import { meta as pigLatinTranslatorMeta } from './list/pig-latin-translator/meta';
import { meta as romanNumeralDatesMeta } from './list/roman-numeral-dates/meta';
import { meta as unicodeConverterMeta } from './list/unicode-converter/meta';
import { meta as removeUnderscoresMeta } from './list/remove-underscores/meta';
import { meta as removeEmDashMeta } from './list/remove-em-dash/meta';
import { meta as randomNumberGeneratorMeta } from './list/random-number-generator/meta';
import { meta as randomPasswordGeneratorMeta } from './list/random-password-generator/meta';
import { meta as randomChoiceGeneratorMeta } from './list/random-choice-generator/meta';
import { meta as randomDateGeneratorMeta } from './list/random-date-generator/meta';
import { meta as randomLetterGeneratorMeta } from './list/random-letter-generator/meta';
import { meta as randomMonthGeneratorMeta } from './list/random-month-generator/meta';
import { meta as randomIpAddressGeneratorMeta } from './list/random-ip-address-generator/meta';
import { meta as nanoidGeneratorMeta } from './list/nanoid-generator/meta';
import { meta as strongPasswordGeneratorMeta } from './list/strong-password-generator/meta';
import { meta as apaCitationGeneratorMeta } from './list/apa-citation-generator/meta';

import { meta as pxToRemConverterMeta } from './list/px-to-rem-converter/meta';
import { meta as wordCounterMeta } from './list/word-counter/meta';
import { meta as imageCompressorResizerMeta } from './list/image-compressor-resizer/meta';
import { meta as videoToGifConverterMeta } from './list/video-to-gif-converter/meta';
import { meta as loremIpsumGeneratorMeta } from './list/lorem-ipsum-generator/meta';
import { meta as unitConverterMeta } from './list/unit-converter/meta';
import { meta as bmiCalculatorMeta } from './list/bmi-calculator/meta';

// PDF tools imports
import { meta as mergePdfMeta } from './list/merge-pdf/meta';
import { meta as splitPdfMeta } from './list/split-pdf/meta';
import { meta as compressPdfMeta } from './list/compress-pdf/meta';
import { meta as wordToPdfMeta } from './list/word-to-pdf/meta';
import { meta as jpgToPdfMeta } from './list/jpg-to-pdf/meta';
import { meta as pdfToJpgMeta } from './list/pdf-to-jpg/meta';
import { meta as editPdfMeta } from './list/edit-pdf/meta';
import { meta as signPdfMeta } from './list/sign-pdf/meta';
import { meta as unlockPdfMeta } from './list/unlock-pdf/meta';

// PDF tools Set 2 imports
import { meta as protectPdfMeta } from './list/protect-pdf/meta';
import { meta as excelToPdfMeta } from './list/excel-to-pdf/meta';
import { meta as powerpointToPdfMeta } from './list/powerpoint-to-pdf/meta';
import { meta as organizePdfMeta } from './list/organize-pdf/meta';
import { meta as addPageNumbersMeta } from './list/add-page-numbers/meta';
import { meta as addWatermarkMeta } from './list/add-watermark/meta';
import { meta as rotatePdfMeta } from './list/rotate-pdf/meta';

// PDF tools Set 3 imports
import { meta as pdfToPdfaMeta } from './list/pdf-to-pdfa/meta';
import { meta as htmlToPdfMeta } from './list/html-to-pdf/meta';
import { meta as removePdfPagesMeta } from './list/remove-pdf-pages/meta';
import { meta as extractPdfPagesMeta } from './list/extract-pdf-pages/meta';
import { meta as pdfFormsMeta } from './list/pdf-forms/meta';
import { meta as redactPdfMeta } from './list/redact-pdf/meta';

import { meta as jwtDebuggerMeta } from './list/jwt-debugger/meta';
import { meta as sqlFormatterMeta } from './list/sql-formatter/meta';
import { meta as cronExpressionDescriptorMeta } from './list/cron-expression-descriptor/meta';
import { meta as usernameAvailabilityCheckerMeta } from './list/username-availability-checker/meta';
import { meta as instagramSansTextGeneratorMeta } from './list/instagram-sans-text-generator/meta';

// Central Registry of all tools
export const registry: ToolMeta[] = [
  instagramSansTextGeneratorMeta,
  wordCounterMeta,
  imageCompressorMeta,
  mergePdfMeta,
  compressPdfMeta,
  splitPdfMeta,
  jsonFormatterMeta,
  passwordGeneratorMeta,
  jpgToPdfMeta,
  pdfToJpgMeta,
  caseConverterMeta,
  uuidGeneratorMeta,
  base64ConverterMeta,
  urlEncoderDecoderMeta,
  hashGeneratorMeta,
  loremIpsumGeneratorMeta,
  unitConverterMeta,
  bmiCalculatorMeta,
  imageCompressorResizerMeta,
  pngToJpgMeta,
  jpgToPngMeta,
  jpgToWebpMeta,
  webpToJpgMeta,
  pngToWebpMeta,
  webpToPngMeta,
  svgToPngMeta,
  htmlToPdfMeta,
  wordToPdfMeta,
  excelToPdfMeta,
  powerpointToPdfMeta,
  rotatePdfMeta,
  protectPdfMeta,
  unlockPdfMeta,
  editPdfMeta,
  signPdfMeta,
  organizePdfMeta,
  addWatermarkMeta,
  addPageNumbersMeta,
  removePdfPagesMeta,
  extractPdfPagesMeta,
  pdfFormsMeta,
  redactPdfMeta,
  pdfToPdfaMeta,
  fancyTextGeneratorMeta,
  fontsForInstagramMeta,
  whatsappFontMeta,
  tiktokFontMeta,
  discordFontMeta,
  facebookFontMeta,
  twitterFontMeta,
  boldTextGeneratorMeta,
  italicTextGeneratorMeta,
  underlineTextGeneratorMeta,
  strikethroughTextGeneratorMeta,
  bubbleTextGeneratorMeta,
  smallTextGeneratorMeta,
  gothicTextGeneratorMeta,
  mirrorTextGeneratorMeta,
  wideTextGeneratorMeta,
  doubleStruckTextMeta,
  invisibleTextGeneratorMeta,
  epochConverterMeta,
  cssFormatterMeta,
  graphqlFormatterMeta,
  htmlToMarkdownConverterMeta,
  jsonStringifyTextMeta,
  jsonUnstringifierMeta,
  unicodeTextConverterMeta,
  unicodeConverterMeta,
  binaryCodeTranslatorMeta,
  hexToTextConverterMeta,
  plainTextConverterMeta,
  characterRemoverMeta,
  duplicateWordFinderMeta,
  removeDuplicateLinesMeta,
  removeTextFormattingMeta,
  sortWordsMeta,
  sentenceCounterMeta,
  findAndReplaceMeta,
  reverseTextGeneratorMeta,
  repeatTextGeneratorMeta,
  camelCaseConverterMeta,
  kebabCaseConverterMeta,
  dotCaseConverterMeta,
  removeUnderscoresMeta,
  removeEmDashMeta,
  caesarCipherToolMeta,
  natoPhoneticAlphabetTranslatorMeta,
  pigLatinTranslatorMeta,
  romanNumeralDatesMeta,
  onlineNotepadMeta,
  imageToAsciiMeta,
  imageToTextOcrMeta,
  gifGeneratorMeta,
  videoToGifConverterMeta,
  randomNumberGeneratorMeta,
  randomPasswordGeneratorMeta,
  strongPasswordGeneratorMeta,
  randomChoiceGeneratorMeta,
  randomDateGeneratorMeta,
  randomLetterGeneratorMeta,
  randomMonthGeneratorMeta,
  randomIpAddressGeneratorMeta,
  nanoidGeneratorMeta,
  apaCitationGeneratorMeta,
  bigTextGeneratorMeta,
  cuteFontMeta,
  pxToRemConverterMeta,
  wordCounterMeta,
  imageCompressorResizerMeta,
  videoToGifConverterMeta,
  loremIpsumGeneratorMeta,

  // PDF tools
  mergePdfMeta,
  splitPdfMeta,
  compressPdfMeta,
  wordToPdfMeta,
  jpgToPdfMeta,
  pdfToJpgMeta,
  editPdfMeta,
  signPdfMeta,
  unlockPdfMeta,

  // PDF tools Set 2
  protectPdfMeta,
  excelToPdfMeta,
  powerpointToPdfMeta,
  organizePdfMeta,
  addPageNumbersMeta,
  addWatermarkMeta,
  rotatePdfMeta,

  // PDF tools Set 3
  pdfToPdfaMeta,
  htmlToPdfMeta,
  removePdfPagesMeta,
  extractPdfPagesMeta,
  pdfFormsMeta,
  redactPdfMeta,
  jwtDebuggerMeta,
  sqlFormatterMeta,
  cronExpressionDescriptorMeta,
  usernameAvailabilityCheckerMeta
];

// Helper to find a tool by its slug
export function getToolBySlug(slug: string): ToolMeta | undefined {
  return registry.find(tool => tool.slug === slug);
}

// Helper to list all tools in a specific category
export function getToolsByCategory(category: ToolCategory): ToolMeta[] {
  return registry.filter(tool => tool.category === category);
}

// Category Configuration details
export interface CategoryDetail {
  slug: ToolCategory;
  title: string;
  description: string;
  icon: string;
}

export const categories: CategoryDetail[] = [
  {
    slug: 'json-yaml',
    title: 'JSON & YAML Tools',
    description: 'Format, validate, parse, and convert JSON or YAML structure strings.',
    icon: 'Braces'
  },
  {
    slug: 'generators',
    title: 'Generators',
    description: 'Generate passwords, hashes, UUIDs, QR codes, or dummy text on the fly.',
    icon: 'Key'
  },
  {
    slug: 'converters',
    title: 'Converters',
    description: 'Convert data representation between Base64, Hex, URL encoding, or different measurement units.',
    icon: 'RefreshCw'
  },
  {
    slug: 'text',
    title: 'Text Tools',
    description: 'Manipulate casing, check diffs, count lines, or filter text data.',
    icon: 'Info'
  },
  {
    slug: 'image',
    title: 'Image Tools',
    description: 'Perform local OCR conversions, image format translations, and render ASCII art.',
    icon: 'Image'
  },
  {
    slug: 'video',
    title: 'Video & Audio Tools',
    description: 'Convert video structures and extract audio tracks completely locally.',
    icon: 'Video'
  },
  {
    slug: 'dev-utils',
    title: 'Developer Utilities',
    description: 'Useful utilities like Epoch converters, crontab editors, and regex checkers.',
    icon: 'Terminal'
  },
  {
    slug: 'security',
    title: 'Security & Cryptography',
    description: 'Generate secure hashes, inspect JWTs, encrypt/decrypt text, and verify signatures.',
    icon: 'Shield'
  },
  {
    slug: 'pdf',
    title: 'PDF Utilities',
    description: 'Merge, split, compress, sign, edit, or unlock PDF files directly in your browser.',
    icon: 'FileText'
  }
];

// Get category details by its slug
export function getCategoryDetail(slug: ToolCategory): CategoryDetail | undefined {
  return categories.find(cat => cat.slug === slug);
}

