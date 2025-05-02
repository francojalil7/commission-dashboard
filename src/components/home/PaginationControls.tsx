import {Button} from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationControls({currentPage, totalPages, onPageChange}: PaginationProps) {
  return (
    <div className="flex justify-center gap-4 py-4">
      <Button
        disabled={currentPage === 1}
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
      >
        {"<"}
      </Button>
      <span className="text-muted-foreground text-sm">
        Página {currentPage} de {totalPages}
      </span>
      <Button
        disabled={currentPage >= totalPages}
        size="sm"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
      >
        {">"}
      </Button>
    </div>
  );
}
