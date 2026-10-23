
from flask import Flask, request, jsonify
from flask_cors import CORS
from able import jawab

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    pesan = data.get("pesan", "").strip()

    if not pesan:
        return jsonify({"error": "Pesan kosong"}), 400

    balasan = jawab(pesan)
    return jsonify({"balasan": balasan})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
