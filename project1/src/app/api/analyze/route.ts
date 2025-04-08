import { NextResponse } from 'next/server';
import Sentiment from 'sentiment';

const sentiment = new Sentiment();

export async function POST(request: Request) {
  try {
    const { text } = await request.json();
    
    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const result = sentiment.analyze(text);
    
    // Convert numerical score to mood
    let mood = 'neutral';
    if (result.score > 2) mood = 'very happy';
    else if (result.score > 0) mood = 'happy';
    else if (result.score < -2) mood = 'very sad';
    else if (result.score < 0) mood = 'sad';

    return NextResponse.json({
      mood,
      score: result.score,
      comparative: result.comparative,
      tokens: result.tokens,
      positive: result.positive,
      negative: result.negative,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze mood' },
      { status: 500 }
    );
  }
} 