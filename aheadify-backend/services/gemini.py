import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")


if not API_KEY:
    raise Exception("GEMINI_API_KEY missing")


client = genai.Client(
    api_key=API_KEY
)

def generate_plan(prompt):

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:

        print(e)

        return "AI service unavailable"