import { Button } from "./ui/button";
import { Link } from "react-router";
import { DateTime } from "luxon";

interface ProductPaginationProps {
    totalPages: number;
}

export default function ProductPagination({ totalPages }: ProductPaginationProps) {
    return (
        <div className="flex items-center justify-center gap-2 mb-4">
            PAGENATION
        </div>
    );
}