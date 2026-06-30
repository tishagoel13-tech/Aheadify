import os
from flask import Flask
from flask_cors import CORS

from routes.planner import planner

app = Flask(__name__)
CORS(app)

app.register_blueprint(planner)

@app.route("/")
def home():
    return {
        "status": "success",
        "message": "Aheadify Backend Running 🚀"
    }

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT",5000))
    )