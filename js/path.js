// js/path.js
// Renderiza un Path como página principal (roadmap)

document.addEventListener("DOMContentLoaded", () => {
    loadPath();
});

/* =========================
   MAIN
========================= */

async function loadPath() {
    const url = new URL(window.location.href);
    const pathId = url.searchParams.get("id");

    if (!pathId) {
        renderError("Path no especificado.");
        return;
    }

    try {
        const [pathsRes, modulesRes] = await Promise.all([
            fetch("data/paths.json"),
            fetch("data/modules.json")
        ]);

        const paths = await pathsRes.json();
        const modules = await modulesRes.json();

        const path = paths.find(p => p.id === pathId);

        if (!path) {
            renderError("Path no encontrado.");
            return;
        }

        renderPath(path, modules);

    } catch (err) {
        console.error("Error cargando path:", err);
        renderError("Error cargando el path.");
    }
}

/* =========================
   RENDER PATH
========================= */

function renderPath(path, allModules) {

    /* -------------------------
       SIDEBAR (IMAGEN)
    ------------------------- */
    const imgEl = document.getElementById("path-image");
    if (imgEl && path.image) {
        imgEl.src = path.image;
        imgEl.alt = path.title;
    }

    /* -------------------------
       HEADER
    ------------------------- */
    document.getElementById("path-title").textContent = path.title;
    document.getElementById("path-description").textContent =
        path.description || "";

    /* -------------------------
       MODULES
    ------------------------- */
    const modulesEl = document.getElementById("path-modules");
    modulesEl.innerHTML = "";

    const orderedModules = (path.modules || [])
        .slice()
        .sort((a, b) => a.order - b.order)
        .map(ref => allModules.find(m => m.id === ref.id))
        .filter(Boolean);

    if (!orderedModules.length) {
        modulesEl.innerHTML = "<p>Este path no tiene módulos.</p>";
        return;
    }

    orderedModules.forEach((module, index) => {
        const section = document.createElement("section");
        section.className = "path-module";

        section.innerHTML = `
            <header class="path-module-header">
                <span class="path-module-index">
                    ${String(index + 1).padStart(2, "0")}
                </span>
                <h2 class="path-module-title">
                    ${module.title}
                </h2>
            </header>

            <p class="path-module-description">
                ${module.description || ""}
            </p>

            <div class="path-module-meta">
                ${module.posts?.length || 0} posts
            </div>

            <a class="path-module-link"
               href="module.html?id=${module.id}">
                Entrar al módulo →
            </a>
        `;

        modulesEl.appendChild(section);
    });
}

/* =========================
   ERROR
========================= */

function renderError(message) {
    const contentEl = document.getElementById("path-content");
    if (contentEl) {
        contentEl.innerHTML = `<p>${message}</p>`;
    }
}
