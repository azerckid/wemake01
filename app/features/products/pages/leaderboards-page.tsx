import { Link } from "react-router";
import type { Route } from "~/+types/products/leaderboards";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentWeek = Math.ceil(new Date().getDate() / 7);

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | Products | wemake" },
        { name: "description", content: "Top performing products" }
    ];
};

export default function LeaderboardsPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Leaderboards"
                description="the most popular products on wemake"
            />
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
                    <p className="text-sm text-muted-foreground">the most popular products on wemake by day</p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/daily">Explore all products &rarr;</Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboard</h2>
                    <p className="text-sm text-muted-foreground">the most popular products on wemake by week</p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/weekly">Explore all products &rarr;</Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboard</h2>
                    <p className="text-sm text-muted-foreground">the most popular products on wemake by month</p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/monthly">Explore all products &rarr;</Link>
                </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboard</h2>
                    <p className="text-sm text-muted-foreground">the most popular products on wemake by year</p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`product-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentCount={1000}
                        viewCount={1000}
                        upvoteCount={1000}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/yearly">Explore all products &rarr;</Link>
                </Button>
            </div>
        </div>
    );
}

