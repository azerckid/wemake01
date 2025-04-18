import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProductReview } from "../mutations";
import { useEffect, useState } from "react";

export function meta() {
    return [
        { title: "Product Reviews | wemake" },
        { name: "description", content: "Read and write product reviews" },
    ];
}

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    try {
        const reviews = await getReviews(client, {
            productId: Number(params.productId),
        });
        return { reviews };
    } catch (error) {
        console.error("Error loading reviews:", error);
        return { reviews: [] };
    }
};

const formSchema = z.object({
    review: z.string().min(1),
    rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }
    await createProductReview(client, {
        productId: params.productId,
        review: data.review,
        rating: data.rating,
        userId,
    });
    return {
        ok: true,
    };
};

export default function ProductReviewsPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (actionData?.ok) {
            setOpen(false);
        }
    }, [actionData]);

    // 리뷰 개수를 계산
    const reviewCount = loaderData.reviews?.length || 0;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="container py-10">
                <div className="space-y-10 max-w-xl">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                        </h2>

                        <DialogTrigger asChild>
                            <Button variant={"secondary"}>Write a review</Button>
                        </DialogTrigger>
                        <CreateReviewDialog />

                    </div>
                    <div className="space-y-20">
                        {loaderData.reviews && loaderData.reviews.length > 0 ? (
                            loaderData.reviews.map((review) => (
                                <ReviewCard
                                    key={review.review_id}
                                    name={review.user?.name || "Anonymous"}
                                    username={review.user?.username || "anonymous"}
                                    avatarUrl={review.user?.avatar_url}
                                    avatarFallback={review.user?.name?.[0] || "U"}
                                    rating={review.rating}
                                    content={review.review}
                                    createdAt={review.created_at}
                                />
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground">No reviews yet</p>
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
}