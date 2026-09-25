import { NextRequest, NextResponse } from 'next/server';
import { StoryLesson } from '@/types/story';
import { validateLesson } from '@/lib/validation/mathValidator';

export async function POST(req: NextRequest) {
  try {
    const lesson = (await req.json()) as StoryLesson;
    const validation = validateLesson(lesson);
    return NextResponse.json({
      success: true,
      validation,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
