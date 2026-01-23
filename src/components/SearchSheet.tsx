import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchSheet: React.FC<SearchSheetProps> = ({ open, onOpenChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="top" className="h-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-left">Search</SheetTitle>
        </SheetHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions, members, groups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={handleClear}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {searchQuery && (
          <div className="mt-4 text-sm text-muted-foreground text-center py-8">
            Search functionality coming soon...
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
