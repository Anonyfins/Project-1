'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeMood = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error('Analysis failed');
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Failed to analyze mood. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case 'very happy': return '😊';
      case 'happy': return '🙂';
      case 'neutral': return '😐';
      case 'sad': return '😔';
      case 'very sad': return '😢';
      default: return '🤔';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center py-20">
        <h1 className="text-4xl font-light mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
          Detect How You Really Feel Through Your Words
        </h1>
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-xl p-8 border border-white/20">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-4 bg-white/50 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none transition-all text-indigo-800 placeholder-indigo-300"
            placeholder="Start typing how you feel..."
          />
          <button
            onClick={analyzeMood}
            disabled={loading || !text.trim()}
            className={`mt-6 px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed ${
              loading ? 'animate-pulse' : 'hover:from-indigo-600 hover:to-purple-600'
            }`}
          >
            {loading ? 'Analyzing...' : 'Analyze Mood'}
          </button>

          {error && (
            <div className="mt-4 text-red-500 text-sm animate-fade-in">
              {error}
            </div>
          )}

          {result && !error && (
            <div className="mt-8 space-y-4 animate-fade-in">
              <div className="text-6xl">{getMoodEmoji(result.mood)}</div>
              <div className="text-xl text-indigo-700 font-light">
                Your mood seems <span className="font-medium">{result.mood}</span>
              </div>
              <div className="text-sm text-indigo-600/70">
                {result.positive.length > 0 && (
                  <div className="mt-2">
                    Positive words: <span className="text-green-500">{result.positive.join(', ')}</span>
                  </div>
                )}
                {result.negative.length > 0 && (
                  <div className="mt-2">
                    Negative words: <span className="text-red-500">{result.negative.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
