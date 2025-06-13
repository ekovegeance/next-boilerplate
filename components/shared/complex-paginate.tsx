"use client";
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import React, { useId } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay?: number;
};

/**
 * Complex Paginate component
 * @description
 * This component is used to display pagination links. It takes an array of links and renders them as pagination items.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param paginationItemsToDisplay - The number of pagination items to display. Default is 5.
 *
 * @example
 * ```tsx
 * <ComplexPaginate currentPage={examples.current_page} totalPages={examples.last_page} />
 * ```
 */
export default function ComplexPaginate({ currentPage, totalPages, paginationItemsToDisplay = 5 }: PaginationProps) {
    const id = useId();

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const page = parseInt((e.target as HTMLInputElement).value);
            if (!isNaN(page) && page > 0 && page <= totalPages) {
                window.location.href = `?page=${page}`;
            }
        }
    };
    return (
        <div className="flex items-center justify-between gap-4">
            {/* Pagination */}
            <div>
                <Pagination>
                    <PaginationContent>
                        {/* Previous page button */}
                        <PaginationItem>
                            {currentPage > 0 && (
                                <PaginationLink
                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                    href={`?page/${currentPage - 1}`}
                                    aria-label="Go to previous page"
                                    aria-disabled={currentPage === 1 ? true : undefined}
                                    role={currentPage === 1 ? 'link' : undefined}
                                >
                                    <ChevronLeftIcon size={16} aria-hidden="true" />
                                </PaginationLink>
                            )}
                        </PaginationItem>

                        {/* Left ellipsis (...) */}
                        {showLeftEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Page number links */}
                        {pages.map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink href={`?page=${page}`} isActive={page === currentPage}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Right ellipsis (...) */}
                        {showRightEllipsis && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

                        {/* Next page button */}
                        <PaginationItem>
                            {currentPage !== totalPages && (
                                <PaginationLink
                                    className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                                    href={`?page=${currentPage + 1}`}
                                    aria-label="Go to next page"
                                    aria-disabled={currentPage === totalPages ? true : undefined}
                                    role={currentPage === totalPages ? 'link' : undefined}
                                >
                                    <ChevronRightIcon size={16} aria-hidden="true" />
                                </PaginationLink>
                            )}
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>

            {/* Go to page input */}
            <div className="flex items-center gap-3">
                <Label htmlFor={id} className="whitespace-nowrap">
                    Go to page
                </Label>
                <Input id={id} type="text" className="w-14" defaultValue={currentPage} onKeyDown={handleKeyDown} />
            </div>
        </div>
    );
}