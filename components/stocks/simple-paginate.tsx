
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


type PaginationProps = {
    currentPage: number;
    totalPages: number;
};

/**
 * Simple Paginate component
 * @description
 * This component is used to display pagination links. It takes an array of links and renders them as pagination items.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 *
 * @example
 * ```tsx
 * <SimplePaginate currentPage={examples.current_page} totalPages={examples.last_page} />
 * ```
 */
export default function SimplePaginate({ currentPage, totalPages }: PaginationProps) {
    return (
        <div className="flex items-center justify-between gap-3">
            <p className="text-muted-foreground grow text-sm" aria-live="polite">
                Page <span className="text-foreground">{currentPage}</span> of <span className="text-foreground">{totalPages}</span>
            </p>
            <Pagination className="w-auto">
                <PaginationContent className="gap-3">
                    <PaginationItem>
                        <Button
                            variant="outline"
                            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={currentPage === 1 ? true : undefined}
                            role={currentPage === 1 ? 'link' : undefined}
                            asChild
                        >
                            {/*<Link href={currentPage === 1 ? undefined : `?page=${currentPage - 1}`}>Previous</Link>*/}
                            {currentPage !== 1 && <Link href={`?page=${currentPage - 1}`}>Previous</Link>}
                        </Button>
                    </PaginationItem>
                    <PaginationItem>
                        <Button
                            variant="outline"
                            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                            aria-disabled={currentPage === totalPages ? true : undefined}
                            role={currentPage === totalPages ? 'link' : undefined}
                            asChild
                        >
                            {currentPage !== totalPages && <Link href={`?page=${currentPage + 1}`}>Next</Link>}
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}