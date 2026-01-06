let allPosts = [];

document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
    setupSearch();
});

/* =========================
   LOAD POSTS
========================= */

function loadPosts() {
    fetch("data/posts.json")
        .then(res => res.json())
        .then(data => {
            allPosts = data;
            renderPosts(data);
        })
        .catch(err => console.error("Error cargando posts:", err));
}

/* =========================
   RENDER POSTS
========================= */

function renderPosts(posts) {
    const grid = document.getElementById("posts-grid");
    grid.innerHTML = "";

    posts.forEach(post => {
        const card = document.createElement("article");
        card.classList.add("post-card");

        card.innerHTML = `
            <div class="post-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>

            <div class="post-card-body">
                <h2 class="post-card-title">${post.title}</h2>
                <p class="post-card-description">
                    ${post.description}
                </p>

                ${renderTags(post.tags)}
            </div>
        `;

        card.addEventListener("click", () => {
            window.location.href = `post.html?post=${post.id}`;
        });

        grid.appendChild(card);
    });
}

/* =========================
   TAGS
========================= */

function renderTags(tags = []) {
    if (!tags.length) return "";

    const items = tags.map(tag => `<li>#${tag}</li>`).join("");

    return `
        <ul class="post-card-tags">
            ${items}
        </ul>
    `;
}

/* =========================
   SEARCH
========================= */

function setupSearch() {
    const searchInput = document.getElementById("searchpostInput");

    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
        const term = searchInput.value.trim().toLowerCase();

        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.description.toLowerCase().includes(term)
        );

        renderPosts(filtered);
    });
}
