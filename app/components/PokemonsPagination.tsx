"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function PokemonsPagination({ numberOfPages }: { numberOfPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);
  const generateHref = (pageNum: number) => `${pathname}?page=${pageNum}`;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage <= 1}
            tabIndex={currentPage <= 1 ? -1 : undefined}
            className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
            href={generateHref(currentPage - 1)}
          />
        </PaginationItem>
        {currentPage - 3 >= 1 ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage - 3)}>{currentPage - 3}</PaginationLink>
          </PaginationItem>
        ) : null}
        {currentPage - 2 >= 1 ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage - 2)}>{currentPage - 2}</PaginationLink>
          </PaginationItem>
        ) : null}
        {currentPage - 1 >= 1 ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage - 1)}>{currentPage - 1}</PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem className="border px-2 py-0.5 rounded-lg">{currentPage}</PaginationItem>
        {currentPage + 1 <= numberOfPages ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage + 1)}>{currentPage + 1}</PaginationLink>
          </PaginationItem>
        ) : null}
        {currentPage + 2 <= numberOfPages ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage + 2)}>{currentPage + 2}</PaginationLink>
          </PaginationItem>
        ) : null}
        {currentPage + 3 <= numberOfPages ? (
          <PaginationItem>
            <PaginationLink href={generateHref(currentPage + 3)}>{currentPage + 3}</PaginationLink>
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationNext
            className={currentPage >= numberOfPages ? "pointer-events-none opacity-50" : undefined}
            aria-disabled={currentPage >= numberOfPages}
            tabIndex={currentPage >= numberOfPages ? -1 : undefined}
            href={generateHref(Number(currentPage) + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default PokemonsPagination;
