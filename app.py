from model import analyze_text
def analyze():
    data = request.json
    text = data.get('text', '')
    result = analyze_text(text)
    return jsonify(result)