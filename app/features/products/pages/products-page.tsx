import type { Route } from "~/+types/products";

export function loader() {
    // return redirect("/products/leaderboards");
    return Response.json({
        hello: "world"
    })
}

export default function ProductsPage({ loaderData }: Route.ComponentProps<typeof loader>) {
    return (
        <div className="container mx-auto px-4">
            <pre>{JSON.stringify(loaderData, null, 2)}</pre>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Products | wemake" },
        { name: "description", content: "Browse products made by our community" }
    ];
};

