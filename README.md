# Vinit Wadgaonkar - AI/LLM Safety Researcher

> **Gaandphad** bio page for AI/LLM researchers and recruiters. Built for impact, not fluff.

[![Deploy to GitHub Pages](https://github.com/vinitwadgaonkar/vinit-llm-bio/actions/workflows/pages.yml/badge.svg)](https://github.com/vinitwadgaonkar/vinit-llm-bio/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Live Preview

**[https://vinitwadgaonkar.github.io/vinit-llm-bio/](https://vinitwadgaonkar.github.io/vinit-llm-bio/)**

## 🎯 What This Is

A **single-page static site** showcasing Vinit Wadgaonkar's expertise in AI/LLM safety research. Designed to impress recruiters, researchers, and engineers in **under 10 seconds**.

### Key Features

- **Dark, minimal design** with geometric accents
- **Deterministic SVG generation** (no AI art, no stock photos)
- **SEO optimized** with JSON-LD structured data
- **GitHub Pages ready** with automated CI/CD
- **Mobile responsive** and accessibility compliant
- **Performance optimized** (Lighthouse score: 95+)

## 🛠️ Tech Stack

- **HTML5** - Semantic markup with accessibility features
- **Tailwind CSS** - Utility-first styling via CDN
- **Vanilla JavaScript** - No frameworks, just performance
- **SVG** - Programmatically generated geometric assets
- **GitHub Actions** - Automated deployment pipeline

## 📂 Project Structure

```
vinit-llm-bio/
├── index.html              # Main page
├── styles.css              # Custom styles
├── script.js               # Dynamic features
├── assets/
│   ├── hero.svg            # Generated geometric hero
│   └── favicon.svg         # Monogram favicon
├── data/
│   └── resume.json         # Structured resume data
├── scripts/
│   └── generate-hero.js    # SVG generation script
├── .github/workflows/
│   └── pages.yml           # GitHub Pages deployment
├── .cursorrules            # Development guidelines
└── README.md               # This file
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinitwadgaonkar/vinit-llm-bio.git
   cd vinit-llm-bio
   ```

2. **Generate assets** (optional)
   ```bash
   node scripts/generate-hero.js
   ```

3. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Or just open index.html directly
   open index.html
   ```

4. **Visit** `http://localhost:8000`

### Deployment

#### Option 1: GitHub Pages (Recommended)

1. **Fork this repository**
2. **Enable GitHub Pages** in repository settings
3. **Push to main branch** - deployment happens automatically
4. **Visit** `https://yourusername.github.io/vinit-llm-bio/`

#### Option 2: Manual Deployment

```bash
# Build (if needed)
node scripts/generate-hero.js

# Deploy to any static hosting
# - Netlify: drag & drop the folder
# - Vercel: vercel --prod
# - AWS S3: aws s3 sync . s3://your-bucket
```

## 🎨 Customization

### Updating Content

1. **Edit `data/resume.json`** for structured data
2. **Modify `index.html`** for layout changes
3. **Update `styles.css`** for design tweaks

### Regenerating Hero SVG

```bash
node scripts/generate-hero.js
```

The script uses seeded randomness based on the name "Vinit Wadgaonkar" to generate consistent, deterministic geometric patterns.

### Color Scheme

Current palette (defined in `styles.css`):
- **Background**: `#0b0b0f` (dark-bg)
- **Accent**: `#a3a3ff` (purple-blue)
- **Secondary**: `#6366f1` (indigo)

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 50KB (no external dependencies)

## 🔧 Development

### Prerequisites

- **Node.js 18+** (for asset generation)
- **Modern browser** (Chrome, Firefox, Safari, Edge)

### Scripts

```bash
# Generate hero SVG
node scripts/generate-hero.js

# Validate HTML (requires html-validate)
npx html-validate index.html

# Run local server
npx serve .
```

### Code Style

- **HTML**: Semantic markup, accessibility-first
- **CSS**: Utility classes + custom properties
- **JavaScript**: Vanilla ES6+, no frameworks
- **SVG**: Programmatically generated, deterministic

## 📝 Content Guidelines

### Writing Style

- **Impact-first**: Lead with metrics and results
- **No buzzwords**: Avoid "passionate", "innovative", "cutting-edge"
- **Specific achievements**: "+45% accuracy", "−60% response time"
- **Technical depth**: Show you understand the problems

### Example Good Copy

❌ **Bad**: "Passionate about AI and machine learning with experience in various technologies"

✅ **Good**: "Developed adversarial robustness frameworks, improving classifier accuracy by +45%"

## 🎯 Target Audience

This page is optimized for:

- **AI/LLM researchers** evaluating technical depth
- **Recruiters** scanning for relevant experience
- **Engineering managers** assessing problem-solving skills
- **Academic collaborators** looking for research fit

## 📈 SEO & Analytics

### Structured Data

- **JSON-LD Person schema** for rich snippets
- **Open Graph tags** for social sharing
- **Twitter Card metadata** for professional networking

### Performance Monitoring

- **Core Web Vitals** tracking
- **Lighthouse CI** integration
- **GitHub Actions** automated testing

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test locally**
5. **Submit a pull request**

### Development Guidelines

- Follow the `.cursorrules` file
- Maintain the "gaandphad" tone
- Keep performance metrics high
- Test across different devices

## 📄 License

MIT License - feel free to use this as a template for your own bio page.

## 🙏 Acknowledgments

- **Tailwind CSS** for utility-first styling
- **GitHub Pages** for free hosting
- **SVG** for scalable graphics
- **Web standards** for accessibility

---

**Built with ❤️ for the AI/LLM research community**

*"This guy knows LLMs, safety, and infra. No BS."* - The goal of this page
