import { Hero } from "~/common/components/hero";
import { CategoryCard } from "../components/category-card";
import type { Route } from "./+types/categories-page";
import { getCategories } from "../queries";
import { browserClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => [
    { title: "Categories | ProductHunt Clone" },
    { name: "description", content: "Browse products by category" },
];

export const loader = async () => {
    const categories = await getCategories(browserClient);
    return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero title="Categories" description="Browse products by category" />
            <div className="grid grid-cols-4 gap-10">
                {(loaderData?.categories ?? []).map((category) => (
                    <CategoryCard
                        key={`categoryId-${category.category_id}`}
                        id={`${category.category_id}`}
                        name={category.name}
                        description={category.description}
                        productCount={category.product_count}
                    />
                ))}
            </div>
        </div>
    );
}