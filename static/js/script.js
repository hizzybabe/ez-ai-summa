// static/js/script.js
function summarize() {
    const text = document.getElementById("input-text").value;
    fetch("/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("summary").textContent = data.summary;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("summary").textContent = "An error occurred while summarizing the text.";
    });
}

// Toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('input-text').classList.toggle('dark-mode');
    document.getElementById('summary').classList.toggle('dark-mode');
});

// Modify the summarize function to include the loading spinner
function summarize() {
    const text = document.getElementById("input-text").value;
    const spinner = document.getElementById("loading-spinner");

    // Show loading spinner
    spinner.style.display = "inline-block";

    fetch("/summarize", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("summary").textContent = data.summary;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("summary").textContent = "An error occurred while summarizing the text.";
    })
    .finally(() => {
        // Hide loading spinner
        spinner.style.display = "none";
    });
}
