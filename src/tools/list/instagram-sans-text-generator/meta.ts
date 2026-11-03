import type { ToolMeta } from '../../definitions';

export const meta: ToolMeta = {
  slug: 'instagram-sans-text-generator',
  title: 'Instagram Sans Text Generator',
  description: 'Generate and preview your text in an Instagram Sans-style typeface. Type, customize, and copy your text instantly with this free client-side tool.',
  category: 'text',
  keywords: [
    'instagram sans text generator',
    'instagram sans font preview',
    'instagram sans font online',
    'instagram font generator',
    'instagram typography generator',
    'instagram sans-style preview',
    'instagram story text preview',
    'instagram headline font',
    'custom font previewer'
  ],
  icon: 'instagram',
  faqs: [
    {
      question: 'What is Instagram Sans?',
      answer: 'Instagram Sans is a custom brand typeface introduced by Meta/Instagram in 2022, designed by Colophon Foundry. It blends neo-grotesque geometric sans-serif structures with rounded "squircle" forms and humanistic curves derived from the Instagram glyph and app interface.'
    },
    {
      question: 'Can I copy Instagram Sans font directly into my Instagram bio or captions?',
      answer: 'When you copy text from any website or tool, you are copying standard Unicode text characters—not the actual font file or CSS typeface. Web fonts like Instagram Sans change how characters look when rendered on a screen, but the underlying text remains normal Unicode. When you paste that text into your Instagram Bio or caption, Instagram will display it in its standard system font.'
    },
    {
      question: 'Why doesn’t this tool convert text into special Unicode characters?',
      answer: 'Instagram Sans is a proprietary visual typeface, not a set of Unicode mathematical or alphabetic symbols. Traditional "fancy font" generators replace letters with unusual Unicode symbols (like mathematical bold or gothic runes) which can break screen readers, harm accessibility, and cause search issues. This tool maintains clean, 100% accessible standard Unicode text while giving you a precise visual preview of your copy in Instagram Sans-style typography.'
    },
    {
      question: 'How does this Instagram Sans text generator work?',
      answer: 'The generator operates 100% client-side in your browser. As you type, it renders your text in real time using high-fidelity geometric webfonts and responsive CSS typography controls (size, weight, letter spacing, line height, alignment, and story backgrounds). No data is ever sent to a server.'
    },
    {
      question: 'Is any proprietary Instagram font file bundled with this tool?',
      answer: 'No. To strictly adhere to intellectual property and licensing guidelines, this tool uses properly licensed, open-source geometric sans-serif typefaces that match the visual metrics of Instagram Sans as an inspired preview alternative. If you hold a valid Instagram Sans font license, you can also configure your local CSS font stack to use it directly.'
    },
    {
      question: 'How can I create graphic stories or posts with this preview?',
      answer: 'You can customize your text, choose between regular, bold, headline, rounded, and script styles, switch background themes (such as the signature Instagram sunset gradient), and use the preview directly to plan your social media copy and layout.'
    }
  ],
  educationalContent: {
    whatIsIt: 'Instagram Sans Text Generator is a client-side typography workspace that lets you compose, format, and preview text in an Instagram Sans-inspired typeface. Built for content creators, social media managers, and designers, it provides an authentic real-time preview of how copy looks in modern neo-grotesque and squircle-contoured typography with fine-grained typographic controls.',
    howToUse: '1. Enter or paste your copy into the input area.\n2. Choose a font variant (Regular, Medium, Bold, Heavy, Headline, Rounded, or Story Script).\n3. Fine-tune your typography using the font size, letter-spacing, line-height, and alignment sliders.\n4. Switch between Direct Preview and the Instagram Story Simulator to see how your text appears on mobile cards.\n5. Click "Copy Text" to copy your clean Unicode text directly to your clipboard.',
    proTips: [
      'For short punchy titles, use "Headline" or "Heavy" with slightly negative letter spacing (-0.02em) to mimic editorial Instagram Story designs.',
      'For multi-line bios and captions, stick to "Regular" or "Medium" with 1.4x line-height to ensure maximum readability.',
      'Remember that copying text copies normal Unicode characters for universal compatibility across apps and devices.'
    ]
  }
};
