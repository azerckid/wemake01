import client from "~/supa-client";
import type { Route } from "./+types/product-visit-page";
import { redirect } from "react-router";

export const loader = async ({ params }: Route.LoaderArgs) => {
    const productId = parseInt(params.productId);
    if (isNaN(productId)) {
        throw new Error("Invalid product ID");
    }
    const { error, data } = await client
        .from("product")
        .select("url")
        .eq("product_id", productId)
        .maybeSingle();

    if (data) {
        await client.rpc("track_event", {
            event_type: "product_visit",
            event_data: {
                product_id: params.productId,
            },
        });
        return redirect(data.url);
    }
};