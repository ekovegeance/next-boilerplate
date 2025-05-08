import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { usePagination } from '@/hooks/use-pagination';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    paginationItemsToDisplay?: number;
};

/**
 * Paginate component
 * @description
 * This component is used to display pagination links. It takes an array of links and renders them as pagination items.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @param paginationItemsToDisplay - The number of pagination items to display. Default is 5.
 *
 * @example
 * ```tsx
 * <Paginate currentPage={examples.current_page} totalPages={examples.last_page} />
 * ```
 */
export default function Paginate({ currentPage, totalPages, paginationItemsToDisplay = 5 }: PaginationProps) {
    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage,
        totalPages,
        paginationItemsToDisplay,
    });

    return (
        <Pagination>
            <PaginationContent>
                {/* Previous page button */}
                <PaginationItem>
                    {currentPage !== 1 && (
                        <PaginationPrevious
                            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            href={`?page=${currentPage - 1}`}
                        />
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
                        <PaginationNext
                            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            href={`?page=${currentPage + 1}`}
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}