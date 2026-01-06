// --------------------------------------------------
// CARGAR Y RENDERIZAR PATHS
// --------------------------------------------------

let allPaths = [];

function testing(){
    console.log("Testing path.js");

}

document.addEventListener("DOMContentLoaded", () => {
    testing();
    loadPaths();
    setupSearch();
});

// Fetch al JSON
function loadPaths() {
    fetch("data/paths.json")
        .then(res => res.json())
        .then(data => {
            allPaths = data;
            renderPaths(data); // aca llamo la funcion renderPaths que me renderia los paths =D 
            console.log(data);
        })
        .catch(err => console.error("Error cargando paths:", err));
    }

// Render básico
function renderPaths(paths) {
    const grid = document.getElementById("pathsGrid");
    grid.innerHTML = "";

    paths.forEach(path => {
        const card = document.createElement("div");
        card.className = "path-card";

        card.innerHTML = `
            <div class="path-card-image">
                <img src="${path.image}" alt="${path.title}">
            </div>

            <div class="path-card-body">
                <h3 class="path-card-title">${path.title}</h3>
                <p class="path-card-description">
                    ${path.description}
                </p>
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `path.html?id=${path.id}`;
        });

        grid.appendChild(card);
    });
}


// --------------------------------------------------
// FILTRAR PATHS EN VIVO
// --------------------------------------------------

function setupSearch() {
    const searchInput = document.getElementById("searchPathInput");

    searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();

        const filtered = allPaths.filter(path =>
            path.title.toLowerCase().includes(term) ||
            path.description.toLowerCase().includes(term)
        );

        renderPaths(filtered);
    });
}
