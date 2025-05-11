from langchain_core.prompts import ChatPromptTemplate
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Set OpenAI-compatible key for Together
os.environ["OPENAI_API_KEY"] = os.environ["TOGETHER_API_KEY"]

# Init model
model = init_chat_model("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", model_provider="together")

# Prompt template setup
system_template = "Translate the following from English into {language}"
prompt_template = ChatPromptTemplate.from_messages([
    ("system", system_template),
    ("user", "{text}")
])

# User input
user_input = {
    "language": "Russian",
    "text": "How are you?"
}

# Format the messages and invoke model
formatted_prompt = prompt_template.invoke(user_input)
response = model.invoke(formatted_prompt)

# Print output
print(response.content)
