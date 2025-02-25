import { redirect } from "react-router";
import type { Route } from "./+types/product-redirect-page";

export const loader = async ({ params }: Route.LoaderArgs) => {
    return redirect(`/products/${params.productId}/overview`);
};
