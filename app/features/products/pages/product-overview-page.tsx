import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/product-overview-page";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);

    try {
        const productId = Number(params.productId);
        if (isNaN(productId)) {
            throw new Error('Invalid product ID');
        }

        const { data: product } = await client
            .from('product')
            .select('description, how_it_works')
            .eq('product_id', productId)
            .single();

        if (!product) {
            throw new Error('Product not found');
        }

        return { product };
    } catch (error) {
        console.error('Error loading product:', error);
        throw new Error('Failed to load product');
    }
};

export default function ProductOverviewPage({ loaderData }: Route.ComponentProps) {
    const { description, how_it_works } = loaderData.product;

    return (
        <div className="space-y-4">
            <div className="space-y-10">
                <div>
                    <h3 className="text-2xl font-semibold mb-4">What is this product?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>
                <div>
                    <h3 className="text-2xl font-semibold mb-4">How does it work?</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        {how_it_works}
                    </p>
                </div>
            </div>
        </div>
    );
}
