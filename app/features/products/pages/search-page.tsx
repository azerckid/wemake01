import type { Route } from "~/+types/products/search";
import { ProductCard } from "../components/product-card";
// import { Input } from "~/common/components/ui/input";

export default function SearchPage() {
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-8">Search Products</h1>
            {/* <div className="max-w-xl mb-8">
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full"
                />
            </div> */}
            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Search result product"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Search | Products | wemake" },
        { name: "description", content: "Search for products and makers" }
    ];
}; 