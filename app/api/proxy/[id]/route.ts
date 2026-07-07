import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET(
  request: NextRequest, 
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // 1. Alaivo ny URL avy ao amin'ny Supabase
  const { data, error } = await supabase
    .from('movies')
    .select('video_url')
    .eq('id', id)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Video tsy hita' }, { status: 404 });
  }

  // 2. Makà ny video avy amin'ny Cloudinary (Backend to Backend)
  const response = await fetch(data.video_url);

  // 3. Avereno ny video amin'ny mpampiasa miaraka amin'ny Cache Headers
  // Ny 's-maxage' dia milaza amin'ny CDN-n'ny Vercel hoe:
  // "Tehirizo ity video ity mandritra ny 30 andro (2592000 segondra)"
  return new Response(response.body, {
    headers: {
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=0, s-maxage=2592000, stale-while-revalidate=86400',
    },
  });
}
