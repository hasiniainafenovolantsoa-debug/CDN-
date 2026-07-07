import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1. Alaivo ny data avy ao amin'ny Supabase
  const { data, error } = await supabase
    .from('movies')
    .select('video_url')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  // 2. Arakaraka ny filanao: 
  // Raha te-hanao "Redirect" (haingana indrindra):
  return NextResponse.redirect(data.video_url);

  // RAH AHOANA KOSA NY HAMAFAHAN'NY VERCEL NY CDN (Streaming)?
  // Raha te-ho "Proxy" tena izy (mandalo amin'ny server anao ny data):
  /*
  const response = await fetch(data.video_url);
  const stream = response.body;
  return new Response(stream, {
    headers: {
      'Content-Type': 'video/mp4',
    },
  });
  */
}
