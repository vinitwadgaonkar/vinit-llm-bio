#!/usr/bin/env node

/**
 * Generate deterministic hero SVG for Vinit's bio page
 * Uses seeded randomness based on name for consistent generation
 */

const fs = require('fs');
const path = require('path');

// Simple seeded random number generator
class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }
    
    next() {
        this.seed = (this.seed * 9301 + 49297) % 233280;
        return this.seed / 233280;
    }
    
    range(min, max) {
        return min + (max - min) * this.next();
    }
    
    int(min, max) {
        return Math.floor(this.range(min, max + 1));
    }
}

// Generate seed from name
function generateSeed(name) {
    let seed = 0;
    for (let i = 0; i < name.length; i++) {
        seed = ((seed << 5) - seed + name.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(seed);
}

// Generate SVG content
function generateHeroSVG() {
    const name = "Vinit Wadgaonkar";
    const seed = generateSeed(name);
    const rng = new SeededRandom(seed);
    
    const width = 400;
    const height = 300;
    
    // Generate random but deterministic elements
    const circles = [];
    const lines = [];
    const polygons = [];
    const dots = [];
    
    // Generate circles
    for (let i = 0; i < 5; i++) {
        circles.push({
            cx: rng.range(50, width - 50),
            cy: rng.range(50, height - 50),
            r: rng.range(20, 80),
            opacity: rng.range(0.1, 0.4)
        });
    }
    
    // Generate lines
    for (let i = 0; i < 3; i++) {
        lines.push({
            x1: rng.range(0, width),
            y1: rng.range(0, height),
            x2: rng.range(0, width),
            y2: rng.range(0, height),
            opacity: rng.range(0.2, 0.4)
        });
    }
    
    // Generate dots
    for (let i = 0; i < 8; i++) {
        dots.push({
            cx: rng.range(20, width - 20),
            cy: rng.range(20, height - 20),
            r: rng.range(1, 4),
            opacity: rng.range(0.4, 0.8)
        });
    }
    
    // Generate geometric shapes
    const shapes = [
        {
            type: 'rect',
            x: rng.range(30, width - 60),
            y: rng.range(30, height - 60),
            width: rng.range(20, 40),
            height: rng.range(20, 40),
            rotation: rng.range(0, 360),
            opacity: rng.range(0.2, 0.4)
        },
        {
            type: 'polygon',
            points: [
                [rng.range(50, width - 50), rng.range(50, height - 50)],
                [rng.range(50, width - 50), rng.range(50, height - 50)],
                [rng.range(50, width - 50), rng.range(50, height - 50)],
                [rng.range(50, width - 50), rng.range(50, height - 50)],
                [rng.range(50, width - 50), rng.range(50, height - 50)],
                [rng.range(50, width - 50), rng.range(50, height - 50)]
            ],
            opacity: rng.range(0.1, 0.3)
        }
    ];
    
    // Build SVG
    let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a3a3ff;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#6366f1;stop-opacity:0.6" />
    </linearGradient>
    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:#a3a3ff;stop-opacity:0.2" />
    </linearGradient>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#a3a3ff" stroke-width="0.5" opacity="0.1"/>
    </pattern>
  </defs>
  
  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#0b0b0f"/>
  
  <!-- Grid pattern -->
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  
  <!-- Generated circles -->`;
  
    circles.forEach((circle, i) => {
        const gradient = i % 2 === 0 ? 'gradient1' : 'gradient2';
        svg += `\n  <circle cx="${circle.cx.toFixed(1)}" cy="${circle.cy.toFixed(1)}" r="${circle.r.toFixed(1)}" fill="url(#${gradient})" opacity="${circle.opacity.toFixed(2)}"/>`;
    });
    
    svg += `\n  
  <!-- Generated lines -->`;
    
    lines.forEach(line => {
        svg += `\n  <line x1="${line.x1.toFixed(1)}" y1="${line.y1.toFixed(1)}" x2="${line.x2.toFixed(1)}" y2="${line.y2.toFixed(1)}" stroke="#a3a3ff" stroke-width="2" opacity="${line.opacity.toFixed(2)}"/>`;
    });
    
    svg += `\n  
  <!-- Generated dots -->`;
    
    dots.forEach(dot => {
        svg += `\n  <circle cx="${dot.cx.toFixed(1)}" cy="${dot.cy.toFixed(1)}" r="${dot.r.toFixed(1)}" fill="#a3a3ff" opacity="${dot.opacity.toFixed(2)}"/>`;
    });
    
    svg += `\n  
  <!-- Generated shapes -->`;
    
    shapes.forEach(shape => {
        if (shape.type === 'rect') {
            svg += `\n  <rect x="${shape.x.toFixed(1)}" y="${shape.y.toFixed(1)}" width="${shape.width.toFixed(1)}" height="${shape.height.toFixed(1)}" fill="url(#gradient1)" opacity="${shape.opacity.toFixed(2)}" transform="rotate(${shape.rotation.toFixed(1)} ${(shape.x + shape.width/2).toFixed(1)} ${(shape.y + shape.height/2).toFixed(1)})"/>`;
        } else if (shape.type === 'polygon') {
            const points = shape.points.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
            svg += `\n  <polygon points="${points}" fill="url(#gradient2)" opacity="${shape.opacity.toFixed(2)}"/>`;
        }
    });
    
    // Add central focal element
    svg += `\n  
  <!-- Central focal element -->
  <circle cx="${width/2}" cy="${height/2}" r="8" fill="url(#gradient1)" opacity="0.8"/>
  <circle cx="${width/2}" cy="${height/2}" r="4" fill="#a3a3ff" opacity="0.9"/>
</svg>`;
    
    return svg;
}

// Main execution
function main() {
    try {
        const svgContent = generateHeroSVG();
        const outputPath = path.join(__dirname, '..', 'assets', 'hero.svg');
        
        fs.writeFileSync(outputPath, svgContent, 'utf8');
        console.log('✅ Hero SVG generated successfully at:', outputPath);
        
        // Validate SVG
        if (svgContent.includes('<svg') && svgContent.includes('</svg>')) {
            console.log('✅ SVG validation passed');
        } else {
            console.error('❌ SVG validation failed');
            process.exit(1);
        }
        
    } catch (error) {
        console.error('❌ Error generating hero SVG:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generateHeroSVG, generateSeed, SeededRandom };
