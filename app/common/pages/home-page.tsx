import type { MetaFunction } from "react-router";
import type { Route } from "./+types/home-page";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { Button } from "../components/ui/button";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | wemake" },
        { name: "description", content: "Home page welcome to our app" }
    ]
}

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const products = await getProductsByDateRange(client, {
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
    });
    const posts = await getPosts(client, {
        limit: 7,
        sorting: "newest",
    });
    const ideas = await getGptIdeas(client, { limit: 7 });
    const jobs = await getJobs(client, { limit: 11 });
    const teams = await getTeams(client, { limit: 7 });
    return { products, posts, ideas, jobs, teams };
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-40">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-sm text-muted-foreground">the best products made by our community today.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/products/leaderboards">Explore all products &rarr;</Link>
                    </Button>
                </div>
                {loaderData.products.map((product, _) => (
                    <ProductCard
                        key={product.product_id}
                        id={Number(product.product_id)}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={Number(product.reviews)}
                        viewsCount={Number(product.views)}
                        votesCount={Number(product.upvotes)}
                        upvoteCount={Number(product.upvotes)}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
                    <p className="text-sm text-muted-foreground">The latest discussions from our community.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/community">Explore all discussions &rarr;</Link>
                    </Button>
                </div>
                {loaderData.posts.map((post) => (
                    <PostCard
                        key={post.post_id}
                        id={String(post.post_id)}
                        title={post.title}
                        author={post.author}
                        authorAvatarUrl={post.authoravatarurl}
                        authorAvatarFallback="CN"
                        category={post.topic}
                        postedAt={post.created_at}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
                    <p className="text-sm text-muted-foreground">Find ideas for your next project.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/ideas" className="text-red-500">Explore all ideas &rarr;</Link>
                    </Button>
                </div>
                {loaderData.ideas.map((idea) => (
                    <IdeaCard
                        key={idea.gpt_idea_id}
                        id={Number(idea.gpt_idea_id)}
                        title={idea.idea ?? ""}
                        viewCount={Number(idea.views)}
                        postedAt={idea.created_at ?? ""}
                        likeCount={Number(idea.likes)}
                        claimed={idea.is_claimed ?? false}
                    />
                ))}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
                    <p className="text-sm text-muted-foreground">Find your dream job.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/jobs" className="text-red-500">Explore all jobs &rarr;</Link>
                    </Button>
                </div>
                {loaderData.jobs.map((job) => (
                    <JobCard
                        key={job.job_id}
                        id={job.job_id}
                        company={job.company_name}
                        companyLogoUrl={job.company_logo_url ? "https://github.com/apple.png" : "https://github.com/apple.png"}
                        companyHQ={job.company_location}
                        title={job.title}
                        postedAt={job.created_at}
                        type={job.job_type}
                        isRemote={job.location_type === "remote"}
                        salary={{ min: 0, max: 0, currency: "USD" }}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Find a team mate</h2>
                    <p className="text-sm text-muted-foreground">Join a team to lookng for a team mate.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/teams" className="text-red-500">Explore all teams &rarr;</Link>
                    </Button>
                </div>
                {loaderData.teams.map((team) => (
                    <TeamCard
                        key={team.team_id}
                        id={Number(team.team_id)}
                        leaderUsername={team.team_leader.username}
                        leaderAvatarUrl={team.team_leader.avatar_url ?? "https://github.com/github.png"}
                        positions={team.roles.split(",")}
                        projectDescription={team.product_description}
                    />
                ))}
            </div>
        </div>
    )
}