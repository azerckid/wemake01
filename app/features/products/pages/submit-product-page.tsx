import type { Route } from "./+types/submit-product-page";
import { Hero } from "~/common/components/hero";
import { useForm } from "react-hook-form";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import { getLoggedInUserId } from "~/features/users/queries";
import { getCategories } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { Form, redirect } from "react-router";
import { z } from "zod";
import { createProduct } from "../mutations";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Product | wemake" },
        { name: "description", content: "Submit your product" },
    ];
};

const formSchema = z.object({
    name: z.string().min(1),
    tagline: z.string().min(1),
    url: z.string().min(1),
    description: z.string().min(1),
    howItWorks: z.string().min(1),
    category: z.coerce.number(),
    icon: z.instanceof(File).refine((file) => {
        return file.size <= 2097152 && file.type.startsWith("image/");
    }),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { data, success, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return { formErrors: error.flatten().fieldErrors };
    }
    const { icon, ...rest } = data;
    const { data: uploadData, error: uploadError } = await client.storage
        .from("icons")
        .upload(`${userId}/${Date.now()}`, icon, {
            contentType: icon.type,
            upsert: false,
        });
    if (uploadError) {
        return { formErrors: { icon: ["Failed to upload icon"] } };
    }
    const {
        data: { publicUrl },
    } = await client.storage.from("icons").getPublicUrl(uploadData.path);
    const productId = await createProduct(client, {
        name: rest.name,
        tagline: rest.tagline,
        description: rest.description,
        howItWorks: rest.howItWorks,
        url: rest.url,
        iconUrl: publicUrl,
        categoryId: rest.category,
        userId,
    });
    return redirect(`/products/${productId}`);
};

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const categories = await getCategories(client);
    return { categories };
};

export default function SubmitPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
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
            <Form
                method="post"
                encType="multipart/form-data"
                className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto"
            >
                <div className="space-y-5">
                    <InputPair
                        label="Product Name"
                        description="The name of your product."
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your product name"
                        required />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.name && (
                            <p className="text-red-500">{actionData.formErrors.name}</p>
                        )}
                    <InputPair
                        label="URL"
                        description="The URL of your product."
                        id="url"
                        name="url"
                        type="text"
                        placeholder="https://example.com"
                        required />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.url && (
                            <p className="text-red-500">{actionData.formErrors.url}</p>
                        )}
                    <InputPair
                        label="Tags"
                        description="The tags of your product."
                        id="tags"
                        name="tagline"
                        type="text"
                        placeholder="Enter your product tags"
                        required />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.tagline && (
                            <p className="text-red-500">{actionData.formErrors.tagline}</p>
                        )}
                    <InputPair
                        textArea
                        label="Description"
                        description="The description of your product."
                        id="description"
                        name="description"
                        type="text"
                        placeholder="Enter your product description"
                        required />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.description && (
                            <p className="text-red-500">{actionData.formErrors.description}</p>
                        )}
                    <InputPair
                        textArea
                        label="How it works"
                        description="A detailed description of how your product howItWorks"
                        id="howItWorks"
                        name="howItWorks"
                        required
                        type="text"
                        placeholder="A detailed description of how your product works"
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.howItWorks && (
                            <p className="text-red-500">{actionData.formErrors.howItWorks}</p>
                        )}
                    <SelectPair
                        label="Category"
                        description="The category of your product."
                        id="category"
                        name="category"
                        required
                        options={loaderData.categories.map((category) => ({
                            label: category.name,
                            value: category.category_id.toString(),
                        }))}
                    />
                    {actionData &&
                        "formErrors" in actionData &&
                        actionData?.formErrors?.category && (
                            <p className="text-red-500">{actionData.formErrors.category}</p>
                        )}
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
            </Form>
        </div>
    );
} 