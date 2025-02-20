import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription } from "~/common/components/ui/card";
import { ChevronRightIcon } from "lucide-react";

interface CategoryCardProps {
    id: string;
    name: string;
    productCount: number;
    description: string;
}

export function CategoryCard({ id, name, productCount, description }: CategoryCardProps) {
    return (
        <Link to={`/products/categories/${id}`} className="block">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        {name}<ChevronRightIcon className="w-4 h-4" />
                    </CardTitle>
                    <CardDescription className="text-base">{description}</CardDescription>
                </CardHeader>
            </Card>
        </Link>
    );
} 