# app.py
from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__, static_url_path='/static')

# Replace with your actual HuggingChat API endpoint and key
HUGGINGCHAT_API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-cnn"
HUGGINGCHAT_API_KEY = os.environ.get("HUGGINGCHAT_API_KEY")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/summarize", methods=["POST"])
def summarize():
    text = request.json["text"]
    
    headers = {"Authorization": f"Bearer {HUGGINGCHAT_API_KEY}"}
    payload = {"inputs": text, "parameters": {"max_length": 100, "min_length": 30}}
    
    response = requests.post(HUGGINGCHAT_API_URL, headers=headers, json=payload)
    
    if response.status_code == 200:
        summary = response.json()[0]["summary_text"]
        return jsonify({"summary": summary})
    else:
        return jsonify({"error": "Failed to generate summary"}), 500

if __name__ == "__main__":
    app.run(debug=True)