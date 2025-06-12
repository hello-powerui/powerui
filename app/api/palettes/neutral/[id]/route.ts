import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/utils/get-current-user';
import { updateNeutralPalette, deleteNeutralPalette } from '@/lib/db/services/palette-service';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await requireUser();
    const data = await req.json();
    
    if (!data.name || !data.shades) {
      return NextResponse.json(
        { error: 'Name and shades are required' },
        { status: 400 }
      );
    }
    
    const palette = await updateNeutralPalette(id, user.id, {
      name: data.name,
      shades: data.shades
    });
    
    return NextResponse.json(palette);
  } catch (error) {
    console.error('Error updating neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update neutral palette' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await requireUser();
    await deleteNeutralPalette(id, user.id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting neutral palette:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete neutral palette' },
      { status: 500 }
    );
  }
}