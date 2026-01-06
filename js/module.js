// js/module.js
// Lector de módulos:
// module.html?id=<module-id>&post=<post-id>

import parseMarkdown from "/js/markdown/parser_markdown.js";

document.addEventListener("DOMContentLoaded", main);

async function main() {
    const url = new URL(window.location.href);
    const moduleId = url.searchParams.get("id");
    let postId = url.searchParams.get("post");

    const moduleTitleEl = document.getElementById("module-title");
    const postTitleEl = document.getElementById("post-title");
    const postContentEl = document.getElementById("post-content");
    const sidebarEl = document.getElementById("post-list");

    if (!moduleId) {
        moduleTitleEl.textContent = "Módulo no especificado";
        return;
    }

    try {
        const [modulesResp, postsResp] = await Promise.all([
            fetch("data/modules.json"),
            fetch("data/posts.json")
        ]);

        const modules = await modulesResp.json();
        const posts = await postsResp.json();

        const module = modules.find(m => m.id === moduleId);
        if (!module) {
            moduleTitleEl.textContent = "Módulo no encontrado";
            return;
        }

        // --------------------------------------------------
        // TÍTULO DEL MÓDULO (H1)
        // --------------------------------------------------

        moduleTitleEl.textContent = module.title;

        // --------------------------------------------------
        // Resolver posts del módulo (ordenados)
        // --------------------------------------------------

        const modulePosts = module.posts
            .slice()
            .sort((a, b) => a.order - b.order)
            .map(ref => posts.find(p => p.id === ref.id))
            .filter(Boolean);

        if (!modulePosts.length) {
            postTitleEl.textContent = "Este módulo no tiene posts";
            postContentEl.innerHTML = "<p>No hay contenido disponible.</p>";
            return;
        }

        // --------------------------------------------------
        // SIDEBAR = ÍNDICE DEL MÓDULO (H2 PUROS)
        // --------------------------------------------------

        sidebarEl.innerHTML = "";

        modulePosts.forEach(post => {
            const h2 = document.createElement("h2");
            h2.className = "module-post-title";
            h2.dataset.postId = post.id;
            h2.textContent = post.title;

            h2.addEventListener("click", () => {
                window.location.href =
                    `${window.location.pathname}?id=${encodeURIComponent(module.id)}&post=${encodeURIComponent(post.id)}`;
            });

            sidebarEl.appendChild(h2);
        });

        // --------------------------------------------------
        // Resolver post activo
        // --------------------------------------------------

        let activePost = modulePosts.find(p => p.id === postId);

        if (!activePost) {
            activePost = modulePosts[0];
            postId = activePost.id;

            window.history.replaceState(
                {},
                "",
                `${window.location.pathname}?id=${encodeURIComponent(module.id)}&post=${encodeURIComponent(postId)}`
            );
        }

        await renderPost(activePost);
        highlightActivePost(activePost.id);

    } catch (err) {
        console.error("Error cargando módulo:", err);
        moduleTitleEl.textContent = "Error cargando el módulo";
    }
}

// --------------------------------------------------
// Render del post activo
// --------------------------------------------------

async function renderPost(post) {
    const titleEl = document.getElementById("post-title");
    const contentEl = document.getElementById("post-content");

    titleEl.textContent = post.title;

    try {
        const resp = await fetch(post.file);
        if (!resp.ok) throw new Error("Markdown no encontrado");

        const md = await resp.text();
        contentEl.innerHTML = parseMarkdown(md);

    } catch (err) {
        console.error("Error cargando post:", err);
        contentEl.innerHTML = "<p>Error cargando el contenido.</p>";
    }
}

// --------------------------------------------------
// Highlight del H2 activo
// --------------------------------------------------

function highlightActivePost(activePostId) {
    document.querySelectorAll(".module-post-title").forEach(h2 => {
        h2.classList.toggle(
            "active",
            h2.dataset.postId === activePostId
        );
    });
}
