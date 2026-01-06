        // Esto carga el navbar y lo tira adentro del element "site-header"
        fetch("navbar.html")
            .then(r => r.text())
            .then(html => document.getElementById("navbar-placeholder").innerHTML = html);
        // Cargar footer y lo tira adentro del element "site-footer"
        fetch("footer.html")
            .then(r => r.text())
            .then(html => document.getElementById("footer-placeholder").innerHTML = html);