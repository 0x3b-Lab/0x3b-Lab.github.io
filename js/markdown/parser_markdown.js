export default function parseMarkdown(md) {
    const lines = md.split("\n");

    let html = "";
    let inCodeBlock = false;
    let codeLang = "";

    let inUL = false;
    let inOL = false;

    for (let line of lines) {

        // =========================
        // CODE BLOCK ```
        // =========================
        if (line.startsWith("```")) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeLang = line.replace("```", "").trim();
                html += `<pre><code${codeLang ? ` class="lang-${codeLang}"` : ""}>`;
            } else {
                inCodeBlock = false;
                html += `</code></pre>`;
            }
            continue;
        }

        if (inCodeBlock) {
            html += escapeHTML(line) + "\n";
            continue;
        }

        
        if (line.startsWith("@youtube(") && line.endsWith(")")) {
    const id = line.slice(9, -1).trim();

    html += `
        <div class="video-embed">
            <iframe
                src="https://www.youtube.com/embed/${id}"
                frameborder="0"
                allowfullscreen>
            </iframe>
        </div>
    `;
    continue;
}



        // =========================
        // VIDEO
        // =========================
        if (line.startsWith("@video(") && line.endsWith(")")) {
            const src = line.slice(7, -1);
            html += `<video controls src="videos/${src}"></video>`;
            continue;
        }

        // =========================
        // HR
        // =========================
        if (line.trim() === "---") {
            closeLists();
            html += "<hr>";
            continue;
        }

        // =========================
        // HEADERS
        // =========================
        if (line.startsWith("## ")) {
            closeLists();
            html += `<h3>${line.slice(3)}</h3>`;
            continue;
        }

        if (line.startsWith("# ")) {
            closeLists();
            html += `<h2>${line.slice(2)}</h2>`;
            continue;
        }

        // =========================
        // BLOCKQUOTE
        // =========================
        if (line.startsWith("> ")) {
            closeLists();
            html += `<blockquote>${inline(line.slice(2))}</blockquote>`;
            continue;
        }

        // =========================
        // ORDERED LIST
        // =========================
        if (/^\d+\. /.test(line)) {
            if (!inOL) {
                closeUL();
                html += "<ol>";
                inOL = true;
            }
            html += `<li>${inline(line.replace(/^\d+\. /, ""))}</li>`;
            continue;
        }

        // =========================
        // UNORDERED LIST
        // =========================
        if (line.startsWith("- ")) {
            if (!inUL) {
                closeOL();
                html += "<ul>";
                inUL = true;
            }
            html += `<li>${inline(line.slice(2))}</li>`;
            continue;
        }

        // =========================
        // EMPTY LINE
        // =========================
        if (line.trim() === "") {
            //closeLists();
            if (!inUL) {
                //closeOL();
                html += "<br>";
                //inUL = true;
            }
            //html += `<br>`;
            
            continue;
        }



        
        // =========================
        // PARAGRAPH
        // =========================
        closeLists();
        html += `<p>${inline(line)}</p>`;
    }

    closeLists();
    return html;

    // =========================
    // HELPERS
    // =========================
    function closeUL() {
        if (inUL) {
            html += "</ul>";
            inUL = false;
        }
    }

    function closeOL() {
        if (inOL) {
            html += "</ol>";
            inOL = false;
        }
    }

    function closeLists() {
        closeUL();
        closeOL();
    }
}

// =========================
// INLINE PARSER
// =========================
function inline(text) {
    return text
        // Obsidian-style image: ![[archivo.png]]
        .replace(/!\[\[([^\]]+)\]\]/g, `<img src="../images/$1" alt="$1">`)
        
        // Markdown image: ![alt](src)
        .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<img src="$2" alt="$1">`)
        
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" target="_blank">$1</a>`)
        
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, `<strong>$1</strong>`)
        
        // Italic
        .replace(/\*([^*]+)\*/g, `<em>$1</em>`)
        
        // Inline code
        .replace(/`([^`]+)`/g, `<code>$1</code>`);
}


// =========================
// ESCAPE HTML
// =========================
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
