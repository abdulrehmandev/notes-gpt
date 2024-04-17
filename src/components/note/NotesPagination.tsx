"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationButton,
  PaginationEllipsis,
  PaginationNext,
} from "../ui/Pagination";

interface NotesPaginationProps {
  hasNextPage: boolean;
}

const NotesPagination: React.FC<NotesPaginationProps> = ({ hasNextPage }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const page = Number(searchParams.get("page")) || 1;

  const handleClick = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handleClick(page - 1)}
            disabled={page <= 1}
          />
        </PaginationItem>
        {page > 1 && (
          <PaginationItem>
            <PaginationButton onClick={() => handleClick(page - 1)}>
              {page - 1}
            </PaginationButton>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationButton>{page}</PaginationButton>
        </PaginationItem>
        {hasNextPage && (
          <PaginationItem>
            <PaginationButton onClick={() => handleClick(page + 1)}>
              {page + 1}
            </PaginationButton>
          </PaginationItem>
        )}
        {hasNextPage && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            onClick={() => handleClick(page + 1)}
            disabled={!hasNextPage}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default NotesPagination;
