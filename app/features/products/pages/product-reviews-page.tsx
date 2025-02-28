import { Button } from "~/common/components/ui/button"
import { ReviewCard } from "../components/review-card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog"
import CreateReviewDialog from "../components/create-review-dialog"
export function meta() {
    return [
        { title: "Product Reviews" },
        { name: "description", content: "Product Reviews" }
    ]
}

export default function ProductReviewsPage() {
    return (
        <Dialog>
            <div className="space-y-10 max-w-screen-md">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">10 reivews</h2>
                    <DialogTrigger >
                        <Button variant="outline">Write a review</Button>
                    </DialogTrigger>
                </div>
                <div className="space-y-20">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ReviewCard
                            key={index}
                            avatarUrl="https://github.com/azerckid.png"
                            avatarFallback="CN"
                            name="John Doe"
                            username="username"
                            rating={5}
                            content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.Quisquam, quos. 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                            createdAt="10 days ago"
                        />
                    ))}
                </div>
            </div>
            <CreateReviewDialog />
        </Dialog>
    )
}