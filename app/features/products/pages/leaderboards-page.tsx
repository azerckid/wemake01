import type { Route } from "~/+types/products/leaderboards";
import { Link } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { ProductCard } from "../components/product-card";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "../queries";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentWeek = Math.ceil(new Date().getDate() / 7);

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | Products | wemake" },
        { name: "description", content: "Top performing products" }
    ];
};

export const loader = async () => {
    const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] =
        await Promise.all([
            getProductsByDateRange({
                startDate: DateTime.now().startOf("day"),
                endDate: DateTime.now().endOf("day"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("week"),
                endDate: DateTime.now().endOf("week"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("month"),
                endDate: DateTime.now().endOf("month"),
                limit: 7,
            }),
            getProductsByDateRange({
                startDate: DateTime.now().startOf("year"),
                endDate: DateTime.now().endOf("year"),
                limit: 7,
            }),
        ]);
    return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

export default function LeaderboardPage({ loaderData }: Route.ComponentProps<typeof loader>) {
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
                {loaderData.dailyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id}
                        id={`product-${product.product_id}`}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
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
                {loaderData.weeklyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id}
                        id={`product-${product.product_id}`}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
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
                {loaderData.monthlyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id}
                        id={`product-${product.product_id}`}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
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
                {loaderData.yearlyProducts.map((product, index) => (
                    <ProductCard
                        key={product.product_id}
                        id={`product-${product.product_id}`}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
                    />
                ))}
                <Button variant="link" asChild className="text-lg self-center">
                    <Link to="/products/leaderboards/yearly">Explore all products &rarr;</Link>
                </Button>
            </div>
        </div>
    );
}

