const fs = require('fs');

function generateId() {
  return Math.random().toString(36).substr(2, 4);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function convertMarkdownToMediumHTML(markdown) {
  const lines = markdown.split('\n');
  const output = [];
  let skipNext = false;
  let inExistingHtml = false;
  let htmlBuffer = [];

  output.push('<!DOCTYPE html>');
  output.push('<html lang="en">');
  output.push('<head>');
  output.push('    <meta charset="UTF-8">');
  output.push('    <meta name="viewport" content="width=device-width, initial-scale=1.0">');
  output.push('    <title>Multi-Agent Facilitation: The Future of Human-AI Interaction</title>');
  output.push('</head>');
  output.push('<body>');
  output.push('');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (line === '') {
      continue;
    }

    // Skip separator lines
    if (line === '---') {
      continue;
    }

    // Handle existing HTML tags (pull quotes, drop caps, lists, etc.)
    if (line.startsWith('<blockquote') || line.startsWith('<p class="graf') ||
        line.startsWith('<ul class') || line.startsWith('<li name')) {
      inExistingHtml = true;
      htmlBuffer = [line];
      continue;
    }

    if (inExistingHtml) {
      htmlBuffer.push(line);
      if (line.startsWith('</blockquote>') || line.startsWith('</p>') || line.startsWith('</ul>')) {
        output.push(htmlBuffer.join('\n'));
        output.push('');
        inExistingHtml = false;
        htmlBuffer = [];
      }
      continue;
    }

    // H1 Title
    if (line.startsWith('# ')) {
      const text = line.slice(2);
      output.push(`<h1 name="${generateId()}" class="graf graf--h1">${text}</h1>`);
      output.push('');
      continue;
    }

    // H3 Headers
    if (line.startsWith('### ')) {
      const text = line.slice(4);
      output.push(`<h3 name="${generateId()}" class="graf graf--h3">${text}</h3>`);
      output.push('');
      continue;
    }

    // H4 Headers
    if (line.startsWith('#### ')) {
      const text = line.slice(5);
      output.push(`<h4 name="${generateId()}" class="graf graf--h4">${text}</h4>`);
      output.push('');
      continue;
    }

    // Regular paragraphs (including lists)
    // Convert **bold** to <strong>
    let processedLine = line.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    // Convert *italic* to <em> (but not **bold** which we already handled)
    processedLine = processedLine.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

    output.push(`<p name="${generateId()}" class="graf graf--p">${processedLine}</p>`);
    output.push('');
  }

  output.push('</body>');
  output.push('</html>');

  return output.join('\n');
}

// Read source Markdown
const markdown = fs.readFileSync('MULTI_AGENT_FACILITATION_PAPER_MEDIUM.md', 'utf8');

// Convert to HTML
const html = convertMarkdownToMediumHTML(markdown);

// Write output
fs.writeFileSync('MULTI_AGENT_FACILITATION_PAPER_MEDIUM_FULL.html', html, 'utf8');

console.log('✅ Conversion complete!');
console.log('📄 Output: MULTI_AGENT_FACILITATION_PAPER_MEDIUM_FULL.html');
console.log('📊 Lines processed:', markdown.split('\n').length);
