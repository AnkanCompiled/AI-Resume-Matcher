import google.generativeai as genai
from langchain_community.vectorstores import FAISS
from langchain.docstore.document import Document
from langchain.embeddings.base import Embeddings
import os
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

class GenAIEmbeddings(Embeddings):
    def embed_query(self, text: str):
        return genai.embed_content(
            model="models/embedding-001",
            content=text,
            task_type="retrieval_query"
        )['embedding']

    def embed_documents(self, texts: list[str]):
        return [
            genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type="retrieval_document"
            )['embedding']
            for text in texts
        ]

class ResumeMatcher:
    def __init__(self):
        self.embedding_model = GenAIEmbeddings()
        self.db = None
        self.job_docs = []

    def add_job_descriptions(self, jobs: list[str]):
        self.job_docs = [Document(page_content=job) for job in jobs]
        self.db = FAISS.from_documents(self.job_docs, self.embedding_model)

    def match_resume(self, resume_text: str, top_k=3):
        return self.db.similarity_search(resume_text, k=top_k)
