import type { Route } from "~/+types/products/leaderboards";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

export default function MonthlyLeaderboardsPage() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Monthly Leaderboards</h1>
                    <p className="text-muted-foreground">Top products of the month</p>
                </div>
                <Button asChild variant="outline">
                    <Link to="/products/leaderboards">Back to Leaderboards</Link>
                </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Top Product"
                        description="A top performing product this month"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Monthly Leaderboards | Products | wemake" },
        { name: "description", content: "Top products of the month" }
    ];
}; 