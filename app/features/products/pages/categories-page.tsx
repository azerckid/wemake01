import type { Route } from "~/+types/products/categories";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

const categories = [
    { id: "ai", name: "AI & ML", count: 150 },
    { id: "productivity", name: "Productivity", count: 89 },
    { id: "developer-tools", name: "Developer Tools", count: 234 },
    { id: "design", name: "Design", count: 167 },
    { id: "marketing", name: "Marketing", count: 123 },
];

export default function CategoriesPage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-8">Product Categories</h1>
            <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        to={`/products/categories/${category.id}`}
                        className="block"
                    >
                        <Button variant="outline" className="w-full justify-between">
                            <span>{category.name}</span>
                            <span className="text-muted-foreground">{category.count}</span>
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Categories | Products | wemake" },
        { name: "description", content: "Browse products by category" }
    ];
}; 