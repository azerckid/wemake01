import { DialogHeader, DialogTitle, DialogFooter } from "~/common/components/ui/dialog";

import { DialogDescription } from "~/common/components/ui/dialog";

import { DialogContent } from "~/common/components/ui/dialog";
import { Form, FormControl, FormItem, FormLabel } from "~/common/components/ui/form";
import { useForm } from "react-hook-form";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Label } from "~/common/components/ui/label";
import { StarIcon } from "lucide-react";
import { useState } from "react";
export default function CreateReviewDialog() {

    const [rating, setRating] = useState<number>(0)
    const [hoveredStar, setHoveredStar] = useState<number>(0)


    const form = useForm({
        defaultValues: {
            rating: 0,
        },
    })

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl font-semibold">what do you think about this product?</DialogTitle>
                <DialogDescription>
                    Please share your thoughts with us.
                </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form className="space-y-10">
                    <div className="space-y-2">
                        <Label className="flex flex-col gap-2 mb-5">Rating
                            <small className="text-gray-500">what would you rate this product?</small>
                        </Label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((_, index) => (
                                <label
                                    key={index}
                                    className={`cursor-pointer relative`}
                                    onMouseEnter={() => setHoveredStar(index)}
                                    onMouseLeave={() => setHoveredStar(0)}>
                                    <StarIcon
                                        className="w-4 h-4 text-yellow-500 "
                                        fill={hoveredStar >= index || rating >= index
                                            ? "currentColor"
                                            : "none"}
                                    />
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={index}
                                        required className="opacity-0 h-px w-px absolute"
                                        onChange={() => setRating(index)}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <InputPair
                        textArea
                        required
                        label="Review"
                        placeholder="Write your review here..."
                        id="review"
                        description="max 1000 characters"
                    />
                </form>
                <DialogFooter>
                    <Button type="submit">Submit</Button>
                </DialogFooter>
            </Form>

        </DialogContent>
    )
}