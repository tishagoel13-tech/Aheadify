from flask import Blueprint, request, jsonify
from services.gemini import generate_plan
import json
planner = Blueprint("planner", __name__)

@planner.route("/generate-plan", methods=["POST"])
def plan():

    data = request.get_json() or {}

    goal = data.get("goal", "")

    prompt = f"""

You are an AI productivity planner.

Break the goal into 4 days.

Return ONLY valid JSON.

Format:

{{
  "days":[
    {{
      "day":"Day 1",
      "tasks":["Task1","Task2","Task3"]
    }},
    {{
      "day":"Day 2",
      "tasks":["Task1","Task2"]
    }}
  ]
}}

Goal:

{goal}
"""

    result = generate_plan(prompt)

    try:
        plan = json.loads(result) 
    except Exception as e:
        print(e)
        plan = {
            "days": []
        }

    return jsonify(plan)

@planner.route("/rescue", methods=["POST"])
def rescue():

    data = request.get_json() or {}

    tasks = data.get("tasks", [])


    prompt = f"""
You are a productivity rescue coach.

The user is behind on these tasks:

{tasks}

Create a recovery plan.

Return:
- Problem analysis
- What to complete first
- Time management advice
- Priority order

Keep it practical.
"""


    result = generate_plan(prompt)


    return jsonify({

        "rescue": result

    })

@planner.route("/assistant", methods=["POST"])
def assistant():

    data = request.get_json() or{}

    question = data.get("question", "")


    prompt = f"""

You are Aheadify AI Assistant.

Answer the user's question clearly.

User question:

{question}

Give practical productivity advice.

"""


    result = generate_plan(prompt)


    return jsonify({

        "response": result

    })