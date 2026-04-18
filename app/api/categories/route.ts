import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';

// GET all categories
export async function GET() {
  const { data, error } = await supabase
    .from('categories')
    .select('name');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST new category
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name } = body;
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const { error } = await supabase
    .from('categories')
    .insert({ name });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE category by name (expects { name })
export async function DELETE(request: NextRequest) {
  const body = await request.json();
  const { name } = body;
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('name', name);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
