function loadHTML(file, elementId) {
    fetch(file, { cache: "no-store" }) // Prevents caching issues
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            return response.text();
        })
        .then(data => {
            const element = document.getElementById(elementId);
            if (!element) throw new Error(`Element with ID "${elementId}" not found.`);

            element.innerHTML = data;
            executeScripts(element);
        })
        .catch(error => console.error("Error loading HTML file:", error));
}

// Function to execute scripts within loaded HTML content
function executeScripts(element) {
    element.querySelectorAll("script").forEach(script => {
        const newScript = document.createElement("script");
        newScript.type = script.type || "text/javascript";

        if (script.src) {
            if (!document.querySelector(`script[src="${script.src}"]`)) {
                newScript.src = script.src;
                newScript.onload = () => console.log(`Loaded script: ${script.src}`);
                document.head.appendChild(newScript);
            }
        } else {
            newScript.textContent = script.textContent;
            document.head.appendChild(newScript).parentNode.removeChild(newScript);
        }
    });
}
