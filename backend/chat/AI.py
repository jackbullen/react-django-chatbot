from dotenv import load_dotenv
load_dotenv()
import os
from openai import OpenAI

api_key=os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

def chat(user_input, i):
    history = [{"role": "system", "content": "You are a helpful assistant"},
               {"role": "user", "content": user_input}]
    response = client.chat.completions.create(model='gpt-4-1106-preview', messages=history, max_tokens=180)
    return response.choices[0].message.content.strip()