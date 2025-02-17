import { Button } from "./ui/button";
import { Link, useSearchParams } from "react-router";
import { DateTime } from "luxon";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious
} from "./ui/pagination";

interface ProductPaginationProps {
    totalPages: number;
}

export default function ProductPagination({ totalPages }: ProductPaginationProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) ?? 1;
    if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        return null;
    }
    const onClick = (page: number) => {
        searchParams.set("page", page.toString());
        setSearchParams(searchParams, { replace: true, preventScrollReset: true });
    }

    return (
        <div className="flex items-center justify-center gap-2 m-4">
            <Pagination>
                <PaginationContent>
                    {currentPage > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationPrevious to={`?page=${currentPage - 1}`} onClick={(event) => { event.preventDefault(); onClick(currentPage - 1) }} />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink to={`?page=${currentPage - 1}`} onClick={(event) => { event.preventDefault(); onClick(currentPage - 1) }}>
                                    {currentPage - 1}
                                </PaginationLink>
                            </PaginationItem>
                        </>
                    )}
                    <PaginationItem>
                        <PaginationLink to={`?page=${currentPage}`} isActive onClick={(event) => { event.preventDefault(); onClick(currentPage) }}>
                            {currentPage}
                        </PaginationLink>
                    </PaginationItem>
                    {currentPage < totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationLink to={`?page=${currentPage + 1}`} onClick={(event) => { event.preventDefault(); onClick(currentPage + 1) }}>
                                    {currentPage + 1}
                                </PaginationLink>
                            </PaginationItem>
                            {currentPage < totalPages - 1 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}
                            <PaginationItem>
                                <PaginationNext to={`?page=${currentPage + 1}`} onClick={(event) => { event.preventDefault(); onClick(currentPage + 1) }} />
                            </PaginationItem>
                        </>
                    )}
                </PaginationContent>
            </Pagination>
        </div>
    );
}