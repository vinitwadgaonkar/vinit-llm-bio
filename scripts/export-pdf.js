#!/usr/bin/env node

/**
 * Export bio sections to PDF
 * Generates a clean, professional PDF version of the bio page
 */

const fs = require('fs');
const path = require('path');

// Simple HTML to PDF converter using basic HTML structure
function generatePDFHTML() {
    const resumeData = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'resume.json'), 'utf8'));
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vinit Wadgaonkar - AI/LLM Safety Researcher</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
        }
        
        .header {
            text-align: center;
            border-bottom: 3px solid #a3a3ff;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        
        .name {
            font-size: 2.5em;
            font-weight: bold;
            color: #0b0b0f;
            margin: 0;
        }
        
        .tagline {
            font-size: 1.2em;
            color: #6366f1;
            margin: 10px 0;
        }
        
        .contact {
            font-size: 0.9em;
            color: #666;
            margin: 10px 0;
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section-title {
            font-size: 1.5em;
            font-weight: bold;
            color: #0b0b0f;
            border-bottom: 2px solid #a3a3ff;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        
        .focus-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .focus-item {
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #a3a3ff;
        }
        
        .focus-title {
            font-weight: bold;
            color: #6366f1;
            margin-bottom: 5px;
        }
        
        .experience-item, .project-item {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
        }
        
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 10px;
        }
        
        .job-title {
            font-weight: bold;
            color: #0b0b0f;
            font-size: 1.1em;
        }
        
        .company {
            color: #6366f1;
            font-weight: bold;
        }
        
        .date {
            color: #666;
            font-size: 0.9em;
        }
        
        .achievements {
            list-style: none;
            padding: 0;
        }
        
        .achievements li {
            margin-bottom: 5px;
            padding-left: 15px;
            position: relative;
        }
        
        .achievements li::before {
            content: "•";
            color: #a3a3ff;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
        
        .education-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        
        .degree {
            font-weight: bold;
            color: #0b0b0f;
        }
        
        .institution {
            color: #6366f1;
        }
        
        .gpa {
            color: #a3a3ff;
            font-weight: bold;
        }
        
        .publication {
            padding: 15px;
            background: #f8f9fa;
            border-radius: 5px;
            margin-bottom: 15px;
        }
        
        .pub-title {
            font-weight: bold;
            color: #0b0b0f;
            margin-bottom: 5px;
        }
        
        .pub-venue {
            color: #6366f1;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 0.9em;
        }
        
        @media print {
            body {
                margin: 0;
                padding: 15px;
            }
            
            .section {
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="name">${resumeData.personal.name}</h1>
        <p class="tagline">${resumeData.personal.tagline}</p>
        <div class="contact">
            ${resumeData.personal.email} | ${resumeData.personal.location}<br>
            GitHub: ${resumeData.personal.github} | LinkedIn: ${resumeData.personal.linkedin}
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">Focused On</h2>
        <div class="focus-grid">
            ${resumeData.focusAreas.map(area => `
                <div class="focus-item">
                    <div class="focus-title">${area.title}</div>
                    <div>${area.description}</div>
                </div>
            `).join('')}
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-title">Experience</h2>
        ${resumeData.experience.map(job => `
            <div class="experience-item">
                <div class="job-header">
                    <div>
                        <div class="job-title">${job.title}</div>
                        <div class="company">${job.company}</div>
                    </div>
                    <div class="date">${job.startDate} - ${job.endDate}</div>
                </div>
                <ul class="achievements">
                    ${job.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                </ul>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2 class="section-title">Publications</h2>
        ${resumeData.publications.map(pub => `
            <div class="publication">
                <div class="pub-title">${pub.title}</div>
                <div class="pub-venue">${pub.venue} (${pub.year})</div>
                <div>${pub.description}</div>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2 class="section-title">Key Projects</h2>
        ${resumeData.projects.map(project => `
            <div class="project-item">
                <div class="job-title">${project.title}</div>
                <div>${project.description}</div>
                <div style="margin-top: 10px; color: #666; font-size: 0.9em;">
                    <strong>Technologies:</strong> ${project.technologies.join(', ')}
                </div>
            </div>
        `).join('')}
    </div>
    
    <div class="section">
        <h2 class="section-title">Education</h2>
        ${resumeData.education.map(edu => `
            <div class="education-item">
                <div>
                    <div class="degree">${edu.degree}</div>
                    <div class="institution">${edu.institution}</div>
                </div>
                <div style="text-align: right;">
                    <div class="date">${edu.startDate} - ${edu.endDate}</div>
                    <div class="gpa">GPA: ${edu.gpa}</div>
                </div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString()} | ${resumeData.personal.website}</p>
    </div>
</body>
</html>`;
}

// Main execution
function main() {
    try {
        const htmlContent = generatePDFHTML();
        const outputPath = path.join(__dirname, '..', 'vinit_llm_bio.html');
        
        fs.writeFileSync(outputPath, htmlContent, 'utf8');
        console.log('✅ PDF-ready HTML generated at:', outputPath);
        console.log('');
        console.log('To convert to PDF:');
        console.log('1. Open the HTML file in a browser');
        console.log('2. Use Print > Save as PDF');
        console.log('3. Or use a tool like Puppeteer:');
        console.log('   npm install puppeteer');
        console.log('   node -e "const puppeteer=require(\'puppeteer\');(async()=>{const browser=await puppeteer.launch();const page=await browser.newPage();await page.goto(\'file://' + outputPath + '\');await page.pdf({path:\'vinit_llm_bio.pdf\',format:\'A4\'});await browser.close();})()"');
        
    } catch (error) {
        console.error('❌ Error generating PDF HTML:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { generatePDFHTML };
