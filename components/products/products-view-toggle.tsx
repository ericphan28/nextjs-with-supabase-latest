"use client";

import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  view: 'card' | 'table';
  onViewChange: (view: 'card' | 'table') => void;
}

export function ProductsViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
      <Button
        variant={view === 'card' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('card')}
        className="h-8 px-3"
      >
        <Grid3X3 className="h-4 w-4 mr-2" />
        Card
      </Button>
      <Button
        variant={view === 'table' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('table')}
        className="h-8 px-3"
      >
        <List className="h-4 w-4 mr-2" />
        Bảng
      </Button>
    </div>
  );
}