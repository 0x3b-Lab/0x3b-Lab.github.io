document.addEventListener("DOMContentLoaded", initGraph);

async function initGraph() {
    const [paths, modules, posts] = await Promise.all([
        fetch("data/paths.json").then(r => r.json()),
        fetch("data/modules.json").then(r => r.json()),
        fetch("data/posts.json").then(r => r.json())
    ]);

    const nodesMap = new Map();
    const edges = [];

    const addNode = (id, label, group, tooltip = "") => {
        if (!nodesMap.has(id)) {
            nodesMap.set(id, {
                id,
                label,
                group,
                title: tooltip || label
            });
        }
    };

    /* ============
       PATHS → MODULES
    ============ */
    paths.forEach(path => {
        addNode(
            path.id,
            path.title,
            "path",
            path.description || path.title
        );

        (path.modules || []).forEach(m => {
            const module = modules.find(mod => mod.id === m.id);
            if (!module) return;

            addNode(
                module.id,
                module.title,
                "module",
                module.description || module.title
            );

            edges.push({
                from: path.id,
                to: module.id
            });
        });
    });

    /* ============
       MODULES → POSTS
    ============ */
    modules.forEach(module => {
        addNode(
            module.id,
            module.title,
            "module",
            module.description || module.title
        );

        (module.posts || []).forEach(p => {
            const post = posts.find(post => post.id === p.id);
            if (!post) return;

            addNode(
                post.id,
                post.title,
                "post",
                post.description || post.title
            );

            edges.push({
                from: module.id,
                to: post.id
            });
        });
    });

    /* ============
       POSTS (seguridad)
    ============ */
    posts.forEach(post => {
        addNode(
            post.id,
            post.title,
            "post",
            post.description || post.title
        );
    });

    renderGraph(
        Array.from(nodesMap.values()),
        edges
    );
}

function renderGraph(nodes, edges) {
    const container = document.getElementById("graph");

    const data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    const options = {
        autoResize: true,
        physics: {
            stabilization: false,
            barnesHut: {
                gravitationalConstant: -25000,
                springLength: 130,
                springConstant: 0.04
            }
        },
        nodes: {
            shape: "dot",
            font: {
                color: "#e0e0e0",
                size: 14
            }
        },
        edges: {
            color: "#444",
            smooth: true
        },
        groups: {
            path: {
                color: { background: "#ff5555", border: "#ff5555" },
                size: 22
            },
            module: {
                color: { background: "#f1fa8c", border: "#f1fa8c" },
                size: 16
            },
            post: {
                color: { background: "#8be9fd", border: "#8be9fd" },
                size: 12
            }
        },
        interaction: {
            hover: true,
            tooltipDelay: 150
        }
    };

    const network = new vis.Network(container, data, options);

    network.on("click", params => {
        if (!params.nodes.length) return;

        const nodeId = params.nodes[0];
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return;

        switch (node.group) {
            case "path":
                window.location.href = `path.html?path=${nodeId}`;
                break;
            case "module":
                window.location.href = `module.html?module=${nodeId}`;
                break;
            case "post":
                window.location.href = `post.html?post=${nodeId}`;
                break;
        }
    });
}
