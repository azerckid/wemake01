import type { Route } from "~/+types/products/promote";
import { Hero } from "~/common/components/hero";
import { Form } from "~/common/components/ui/form";
import { useForm } from "react-hook-form";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export default function PromotePage() {
    const form = useForm();
    const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();


    const totalDays = promotionPeriod?.from && promotionPeriod?.to
        ? DateTime.fromJSDate(promotionPeriod.to).diff(DateTime.fromJSDate(promotionPeriod.from), "days").days : 0;

    return (
        <div>
            <Hero title="Promote your product" description="Boost your product's visibility and engagement with targeted promotions." />
            <Form {...form}>
                <div className="mx-auto flex flex-col gap-4 justify-center items-center">
                    <form className="flex flex-col justify-center items-center gap-10 w-full max-w-screen-sm ">
                        <div className="flex flex-col gap-2 min-w-full">
                            <SelectPair
                                label="Select a product"
                                description="Select a product to promote"
                                name="product"
                                placeholder="Select a product"
                                options={[
                                    {
                                        label: "Product 1",
                                        value: "product-1"
                                    },
                                    {
                                        label: "Product 2",
                                        value: "product-2"
                                    },
                                    {
                                        label: "Product 3",
                                        value: "product-3"
                                    }
                                ]}
                                id="product"
                            />
                        </div>
                        <div className="flex flex-col items-center gap-2 w-full text-center">
                            <Label className="flex flex-col items-center gap-2">
                                Select a date
                                <small className="text-muted-foreground text-center">
                                    minimum duration is 3 days
                                </small>
                            </Label>
                            <Calendar
                                mode="range"
                                selected={promotionPeriod}
                                onSelect={setPromotionPeriod}
                                min={3}
                                disabled={{ before: new Date() }}
                            />
                        </div>
                        <Button disabled={totalDays < 3}>
                            Go to checkout {totalDays} days {totalDays * 20}€
                        </Button>
                    </form>
                </div>
            </Form>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Promote | Products | wemake" },
        { name: "description", content: "Promote your product to reach more users" }
    ];
}; 