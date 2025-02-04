import type { MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | wemake" },
        { name: "description", content: "Home page welcome to our app" }
    ]
}

export default function HomePage() {
    return (
        <div className="px-20">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-sm text-muted-foreground">the best products made by our community today.</p>
                </div>

                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}

            </div>
        </div>
    )
}