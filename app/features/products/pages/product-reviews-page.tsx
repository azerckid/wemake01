import { Button } from "~/common/components/ui/button"
import { ReviewCard } from "../components/review-card"
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog"
import CreateReviewDialog from "../components/create-review-dialog"
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviews } from "../queries";

export function meta() {
    return [
        { title: "Product Reviews | wemake" },
        { name: "description", content: "Read and write product reviews" },
    ];
}
export const loader = async ({ params }: Route.LoaderArgs) => {
    const reviews = await getReviews(parseInt(params.productId));
    return { reviews };
};

export default function ProductReviewsPage({
    loaderData,
}: Route.ComponentProps) {
    const { review_count } = useOutletContext<{
        review_count: string;
    }>();
    return (
        <Dialog>
            <div className="space-y-10 max-w-screen-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {review_count} {review_count === "1" ? "Review" : "Reviews"}
                    </h2>
                    <DialogTrigger >
                        <Button variant="outline">Write a review</Button>
                    </DialogTrigger>
                </div>
                <div className="space-y-20">
                    {loaderData.reviews.map((review) => (
                        <ReviewCard
                            key={review.review_id}
                            avatarUrl={review.user?.avatar_url ?? null}
                            avatarFallback={review.user?.name?.charAt(0) || "CN"}
                            name={review.user?.name || "John Doe"}
                            username={review.user?.username || "username"}
                            rating={review.rating}
                            content={review.review}
                            createdAt={review.created_at}
                        />
                    ))}
                </div>
            </div>
            <CreateReviewDialog />
        </Dialog>
    )
}