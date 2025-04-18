import { makeSSRClient } from "~/supa-client";
import { getReviews } from "../queries";
import type { Route } from "./+types/product-reviews-page";
import { ReviewCard } from "../components/review-card";
import { z } from "zod";
import { getLoggedInUserId } from "~/features/users/queries";
import { createProductReview } from "../mutations";
import { useState, useEffect } from "react";
import { Button } from "~/common/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { StarIcon } from "lucide-react";

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
    const { client, headers } = makeSSRClient(request);
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
    const [rating, setRating] = useState(0);
    const [hoveredStar, setHoveredStar] = useState(0);

    useEffect(() => {
        if (actionData?.ok) {
            setOpen(false);
        }
    }, [actionData]);

    const reviewCount = loaderData.reviews?.length || 0;

    return (
        <div className="container py-10">
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {reviewCount} {reviewCount === 1 ? "Review" : "Reviews"}
                    </h2>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant={"secondary"}>Write a review</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Write a review</DialogTitle>
                                <DialogDescription>
                                    Share your thoughts about this product.
                                </DialogDescription>
                            </DialogHeader>
                            <form method="post" className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rating</label>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                className="focus:outline-none"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHoveredStar(star)}
                                                onMouseLeave={() => setHoveredStar(0)}
                                            >
                                                <StarIcon
                                                    className={`size-6 ${star <= (hoveredStar || rating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-gray-300"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    {actionData?.formErrors?.rating && (
                                        <p className="text-red-500">
                                            {actionData.formErrors.rating}
                                        </p>
                                    )}
                                    <input
                                        type="hidden"
                                        name="rating"
                                        value={rating}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label
                                        htmlFor="review"
                                        className="text-sm font-medium"
                                    >
                                        Review
                                    </label>
                                    <Textarea
                                        id="review"
                                        name="review"
                                        placeholder="Write your review here..."
                                        className="min-h-[100px]"
                                    />
                                </div>
                                {actionData?.formErrors?.review && (
                                    <p className="text-red-500">
                                        {actionData.formErrors.review}
                                    </p>
                                )}
                                <div className="flex justify-end">
                                    <Button type="submit">Submit Review</Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="space-y-6">
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
    );
}