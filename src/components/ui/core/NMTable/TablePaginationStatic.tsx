// components/ui/core/NMTable/TablePagination.tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";

interface TablePaginationProps {
  totalPage: number;
  currentPage: number;
  onPageChange(page: number): void;
}

export default function TablePaginationStatic({
  totalPage,
  currentPage,
  onPageChange,
}: TablePaginationProps) {
  return (
    <div className="flex items-center gap-2 my-5">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
        size="sm"
        className="rounded-full"
      >
        <ArrowLeft />
      </Button>

      {[...Array(totalPage)].map((_, i) => {
        const page = i + 1;
        return (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className="rounded-full"
          >
            {page}
          </Button>
        );
      })}

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPage}
        variant="outline"
        size="sm"
        className="rounded-full"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
