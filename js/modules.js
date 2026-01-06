document.addEventListener("DOMContentLoaded", () => {
    loadModules();
    setupModuleSearch();
});

let allModules = [];

/* =========================
   LOAD MODULES
========================= */

async function loadModules() {
    const grid = document.getElementById("modulesGrid");

    try {
        const res = await fetch("data/modules.json");
        allModules = await res.json();

        renderModules(allModules);

    } catch (err) {
        console.error("Error cargando modules.json", err);
        grid.innerHTML = "<p>Error cargando módulos.</p>";
    }
}

/* =========================
   RENDER MODULES
========================= */

function renderModules(modules) {
    const grid = document.getElementById("modulesGrid");
    grid.innerHTML = "";

    if (!modules || modules.length === 0) {
        grid.innerHTML = "<p>No hay módulos disponibles.</p>";
        return;
    }

    modules.forEach(module => {
        const card = document.createElement("article");
        card.className = "module-card";

        card.addEventListener("click", () => {
            window.location.href = `module.html?id=${module.id}`;
        });

        card.innerHTML = `
            <div class="module-card-image">
                <img src="${module.image || 'images/logo.png'}" alt="${module.title}">
            </div>

            <div class="module-card-body">
                <h2 class="module-card-title">${module.title}</h2>
                <p class="module-card-description">
                    ${module.description || ""}
                </p>

                <ul class="module-card-tags">
                    <li>${module.posts?.length || 0} posts</li>
                </ul>
            </div>
        `;

        grid.appendChild(card);
    });
}

/* =========================
   SEARCH
========================= */

function setupModuleSearch() {
    const input = document.getElementById("searchModuleInput");
    if (!input) return;

    input.addEventListener("input", () => {
        const query = input.value.toLowerCase().trim();

        const filtered = allModules.filter(module =>
            module.title.toLowerCase().includes(query) ||
            (module.description && module.description.toLowerCase().includes(query))
        );

        renderModules(filtered);
    });
}
