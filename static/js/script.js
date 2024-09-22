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