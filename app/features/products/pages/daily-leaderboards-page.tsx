import type { Route } from "~/+types/products/leaderboards";

export default function DailyLeaderboardsPage({ params }: Route.LoaderArgs) {
    const { year, month, day } = params;
    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold">Daily Leaderboards</h1>
            <p className="text-muted-foreground">Top products of the day</p>
            <div className="grid grid-cols-3 gap-4">
                {year}/{month}/{day}
            </div>
        </div>
    );
}

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Daily Leaderboards | Products | wemake" },
        { name: "description", content: "Top products of the day" }
    ];
}; 