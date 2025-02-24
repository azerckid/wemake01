import type { Route } from "~/+types/products/submit";
import { Hero } from "~/common/components/hero";
import { Form } from "~/common/components/ui/form";
import { useForm } from "react-hook-form";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";

export const action = async () => {
    return { success: true };
};

export default function SubmitPage({ actionData }: Route.ComponentProps<typeof action>) {
    const form = useForm();
    const [icon, setIcon] = useState<File | null>(null);

    const onChangeIcon = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setIcon(file);
        }
    };
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
                        <Button type="submit" className="w-full" size="lg">Submit</Button>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <div className="size-40 rounded-xl shadow-xl overflow-hidden">
                            {icon && (
                                <img
                                    src={URL.createObjectURL(icon)}
                                    alt="Icon"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <Label className="flex flex-col gap-1">
                            Icon{""}
                            <small className="text-muted-foreground">
                                The icon of your product.
                            </small>
                        </Label>
                        <Input type="file" id="icon" name="icon" className="w-1/2" onChange={onChangeIcon} />
                        <div className="flex flex-col gap-1 text-xs">
                            <span className="text-muted-foreground">
                                Recommended size: 128x128px
                            </span>
                            <span className="text-muted-foreground">
                                Recommended format: PNG
                            </span>
                            <span className="text-muted-foreground">
                                Recommended file size: 100KB
                            </span>
                        </div>
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