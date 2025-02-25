import { ChevronUpIcon, StarIcon } from "lucide-react";
import type { Route } from "./+types/product-overview-page";
import type { MetaFunction } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export function loader({ params }: Route.LoaderArgs) {
    return {
        productId: params.productId
    };
}

export const meta: Route.MetaFunction = ({ data }) => {
    const productData = data as { productId: string } | undefined;

    if (!productData) {
        return [
            { title: "Product Not Found" },
            { name: "description", content: "The requested product could not be found." }
        ];
    }

    return [
        { title: `Product ${productData.productId} Overview` },
        { name: "description", content: `Detailed overview of product ${productData.productId}` }
    ];
};

export default function ProductOverviewPage({ loaderData }: Route.ComponentProps) {
    if (!loaderData) return null;
    const { productId } = loaderData;

    return (
        <div className="space-y-4">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50">
                    </div>
                    <div>
                        <h1 className="text-5xl font-bold">Product Name</h1>
                        <p>Product ID: {productId}</p>
                        <p className="text-2xl font-light text-muted-foreground">Product Description</p>
                        <div className="mt-5 flex items-center gap-5">
                            <div className="flex gap-2">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarIcon key={index} className="w-4 h-4 text-yellow-500" fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-muted-foreground">100 reviews</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" size="lg" className="text-lg h-14 px-10">
                        Visit Website
                    </Button>
                    <Button variant="outline" size="lg" className="text-lg h-14 px-10">
                        <ChevronUpIcon className="w-4 h-4" />
                        Upvote (100)
                    </Button>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" asChild>
                    <Link to={`/products/${productId}/overview`}>Overview</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to={`/products/${productId}/reviews`}>Reviews</Link>
                </Button>
            </div>
            <div className="space-y-10">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">What is this product?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        This innovative product revolutionizes how we approach daily tasks. Built with cutting-edge
                        technology, it seamlessly integrates into your workflow while maintaining exceptional
                        performance and reliability. The intuitive interface makes it accessible for beginners
                        while offering advanced features for power users.
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-4">How does it work?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        This innovative product revolutionizes how we approach daily tasks. Built with cutting-edge
                        technology, it seamlessly integrates into your workflow while maintaining exceptional
                        performance and reliability. The intuitive interface makes it accessible for beginners
                        while offering advanced features for power users.
                    </p>
                </div>
            </div>

        </div>
    );
}
