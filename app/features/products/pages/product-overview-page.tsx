import { useOutletContext } from "react-router";
import client from "~/supa-client";
import type { Route } from "./+types/product-overview-page";

export const loader = async ({ params }: Route.LoaderArgs) => {
    await client.rpc("track_event", {
        event_type: "product_view",
        event_data: {
            product_id: params.productId,
        },
    });
    return null;
};

export default function ProductOverviewPage() {
    const { description, how_it_works } = useOutletContext<{ description: string, how_it_works: string }>();

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
