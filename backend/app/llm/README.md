# LangChain Concepts

## 🔗 LangChain Concepts Summary

This section provides an overview of the key LangChain components and concepts explored so far.

---

### ✅ 1. LLMs & Model Providers

- Use language models like **GPT-4**, **LLaMA 3**, or **Cohere Command R** via API.
- Providers (e.g., `OpenAI`, `Together AI`, `Cohere`) host and serve models through endpoints.
- LangChain simplifies interaction:

```python
from langchain.chat_models import init_chat_model

model = init_chat_model("meta-llama/Llama-3.3-70B-Instruct-Turbo-Free", model_provider="together")
```

### ✅ 2. Messages vs. Prompt Templates

LangChain uses message-based prompting (SystemMessage, HumanMessage).
Use Prompt Templates to dynamically generate prompts from user input.

```python
from langchain_core.prompts import ChatPromptTemplate

prompt_template = ChatPromptTemplate.from_messages([
    ("system", "Translate from English to {language}"),
    ("user", "{text}")
])

prompt = prompt_template.invoke({"language": "Italian", "text": "Hello"})
```

### ✅ 3. Chains

A Chain sequences multiple steps together (e.g., formatting → LLM call).
Common types include LLMChain, RetrievalQA, and custom chains.

### ✅ 4. LangSmith (Tracing)

LangSmith traces and logs all interactions for debugging and observability.

Shows:
- Prompt inputs
- Token usage
- Latency
- Intermediate chain outputs

Enable with environment variables:

```bash
export LANGCHAIN_TRACING_V2=true
export LANGSMITH_API_KEY=your_key
```

### ✅ 5. Embeddings

Embeddings convert text into vectors for semantic similarity comparison.
Core to search, clustering, and Retrieval-Augmented Generation (RAG).
Example: "What is AI?" → [0.25, -0.11, ..., 0.73]

### ✅ 6. Vector Stores

Vector stores persist embeddings and enable fast similarity search.

Examples:
- Pinecone
- Chroma
- FAISS

### ✅ 7. Retrievers

Retrievers find and return documents most relevant to a user query.
Powered by vector stores under the hood.
Essential in RAG workflows.

### ✅ 8. RAG (Retrieval-Augmented Generation)

Combines retrieval and generation for grounded, accurate LLM outputs.

RAG Workflow:
1. Embed documents (e.g., PDFs)
2. Store them in a vector database
3. Retrieve relevant docs at query time
4. Send docs + user question to the LLM

### ✅ 9. Model Providers Overview

| Provider | Offers | Known For |
|----------|---------|------------|
| Together AI | Open-source models via API | LLaMA 3, DeepSeek, free-tier hosting |
| OpenAI | Proprietary models | GPT-4, GPT-4o, industry standard |
| Cohere | Proprietary + embedding models | RAG, enterprise use cases, fast embeddings |

