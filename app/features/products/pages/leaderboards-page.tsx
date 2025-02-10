import type { Route } from "~/+types/products/leaderboards";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentWeek = Math.ceil(new Date().getDate() / 7);

export default function LeaderboardsPage() {
    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Leaderboards</h1>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link to={`/products/leaderboards/yearly/${currentYear}`}>Yearly</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to={`/products/leaderboards/monthly/${currentYear}/${currentMonth}`}>Monthly</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link to={`/products/leaderboards/weekly/${currentYear}/${currentWeek}`}>Weekly</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Top Product"
                        description="A trending product"
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
        { title: "Leaderboards | Products | wemake" },
        { name: "description", content: "Top performing products" }
    ];
}; 