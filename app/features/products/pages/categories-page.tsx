import type { Route } from "~/+types/products/categories";
import { Hero } from "~/common/components/hero";
import { CategoryCard } from "../components/category-card";

// const categories = [
//     { id: "ai", name: "AI & ML", productCount: 150 },
//     { id: "productivity", name: "Productivity", productCount: 89 },
//     { id: "developer-tools", name: "Developer Tools", productCount: 234 },
//     { id: "design", name: "Design", productCount: 167 },
//     { id: "marketing", name: "Marketing", productCount: 123 },
// ];

export default function CategoriesPage() {
    return (
        <div className="space-y-10">
            <Hero title="Categories" description="Browse products by category" />
            <div className="grid grid-cols-4 gap-10">
                {Array.from({ length: 10 }).map((_, index) => (
                    <CategoryCard
                        key={index}
                        id={`category-${index}`}
                        name={`Category ${index}`}
                        productCount={100}
                        description={`Category ${index} description`}
                    />
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