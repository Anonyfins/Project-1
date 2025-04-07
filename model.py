import torch
from transformers import pipeline
classifier = pipeline("moodCheck", framework="pt")

def analyze_text(text):
    return classifier(text)[0]