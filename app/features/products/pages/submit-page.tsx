import type { Route } from "~/+types/products/submit";
import { Hero } from "~/common/components/hero";
import { Form } from "~/common/components/ui/form";
import { useForm } from "react-hook-form";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const action = async () => {
    return { success: true };
};

export default function SubmitPage({ actionData }: Route.ComponentProps<typeof action>) {
    const form = useForm();
    return (
        <div className="space-y-10">
            <Hero title="Submit Your Product" description="Share your product with the community" />
            <Form {...form}>
                <form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto ">
                    <div className="space-y-5">
                        <InputPair
                            label="Product Name"
                            description="The name of your product."
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your product name"
                            required />
                        <InputPair
                            label="URL"
                            description="The URL of your product."
                            id="url"
                            name="url"
                            type="text"
                            placeholder="https://example.com"
                            required />
                        <InputPair
                            label="Tags"
                            description="The tags of your product."
                            id="tags"
                            name="tags"
                            type="text"
                            placeholder="Enter your product tags"
                            required />
                        <InputPair
                            textArea
                            label="Description"
                            description="The description of your product."
                            id="description"
                            name="description"
                            type="text"
                            placeholder="Enter your product description"
                            required />
                        <SelectPair
                            label="Category"
                            description="The category of your product."
                            id="category"
                            name="category"
                            required
                            options={[
                                { label: "Category 1", value: "category-1" },
                                { label: "Category 2", value: "category-2" },
                                { label: "Category 3", value: "category-3" },
                            ]}
                        />
                    </div>


                </form>
            </Form>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit | Products | wemake" },
        { name: "description", content: "Share your product with the community" }
    ];
}; 