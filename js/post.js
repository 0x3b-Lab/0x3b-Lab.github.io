import parseMarkdown from "./markdown/parser_markdown.js";

document.addEventListener("DOMContentLoaded", () => {
    loadPost();
});

async function loadPost() {
    const url = new URL(window.location.href);
    const postId = url.searchParams.get("post");

    const titleEl = document.getElementById("post-title");
    const contentEl = document.getElementById("post-content");

    if (!postId) {
        titleEl.textContent = "Post no especificado";
        contentEl.innerHTML = "<p>No se indicó ningún post.</p>";
        return;
    }

    try {
        const postsResp = await fetch("data/posts.json");
        const posts = await postsResp.json();

        const post = posts.find(p =>
            p.id.toLowerCase() === postId.toLowerCase()
        );

        if (!post) {
            titleEl.textContent = "Post no encontrado";
            contentEl.innerHTML = "<p>El post no existe.</p>";
            return;
        }

        titleEl.textContent = post.title || post.id;

        if (!post.file) {
            contentEl.innerHTML = "<p>Este post no tiene contenido.</p>";
            return;
        }

        const mdPath = post.file.startsWith("/")
            ? post.file.slice(1)
            : post.file;

        const mdResp = await fetch(mdPath);
        if (!mdResp.ok) throw new Error("Markdown no encontrado");

        const mdText = await mdResp.text();

        // 🔥 TU PARSER
        contentEl.innerHTML = parseMarkdown(mdText);

    } catch (err) {
        console.error("Error cargando post:", err);
        titleEl.textContent = "Error";
        contentEl.innerHTML = "<p>Error cargando el post.</p>";
    }
}
