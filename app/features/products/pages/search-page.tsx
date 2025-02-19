import type { Route } from "~/+types/products/search";
import { z } from "zod";
import { json } from "node:stream/consumers";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Form, FormField } from "~/common/components/ui/form";
import { useForm } from "react-hook-form";

const paramSchema = z.object({
    query: z.string().optional().default(""),
    page: z.coerce.number().optional().default(1)
});

export const loader = async ({ request }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const { success, data: parsedData } = paramSchema.safeParse({
        ...Object.fromEntries(url.searchParams)
    });

    if (!success) {
        throw new Error("Invalid search parameters");
    }
    console.log(parsedData);
};


export default function SearchPage() {
    const form = useForm();

    return (
        <div className="space-y-10">
            <Hero title="Search" description="Search for products and makers" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit((data) => console.log(data))} className="flex gap-2 max-w-screen-md mx-auto">
                    <Input name="query" placeholder="Search for products and makers" />
                    <Button type="submit">Search</Button>
                </form>
            </Form>
            <div className="space-y-4 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard key={index} id={`product-${index}`} name="Product Name" description="Search result product" commentCount={1000} viewCount={1000} upvoteCount={1000} />
                ))}
            </div>
            <ProductPagination totalPages={10} />
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Search | Products | wemake" },
        { name: "description", content: "Search for products and makers" }
    ];
}; 