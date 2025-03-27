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

export const meta: MetaFunction = () => {
    return [
        { title: "Home | wemake" },
        { name: "description", content: "Home page welcome to our app" }
    ]
}

export const loader = async () => {
    const products = await getProductsByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
    });
    const posts = await getPosts({
        limit: 7,
        sorting: "newest",
    });
    return { products, posts };
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
                        id={`product-${product.product_id}`}
                        name={product.name}
                        description={product.description}
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
                        id={`postId-${post.post_id}`}
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
                {Array.from({ length: 11 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id={`ideaId-${index}`}
                        title="A startup that create an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as website to manage the business."
                        viewCount={100}
                        postedAt="12 hours ago"
                        likeCount={100}
                        claimed={index % 2 === 0}
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
                {Array.from({ length: 11 }).map((_, index) => (
                    <JobCard
                        key={index}
                        id="jobId"
                        company="Tesla"
                        companyHQ="San Francisco, CA"
                        companyLogoUrl="https://github.com/facebook.png"
                        title="Software Engineer"
                        postedAt="12 hours ago"
                        type="Full-time"
                        isRemote={true}
                        salary={{
                            min: 100000,
                            max: 120000,
                            currency: "$"
                        }}
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
                {Array.from({ length: 11 }).map((_, index) => (
                    <TeamCard
                        key={index}
                        id="teamId"
                        leaderUsername="zizimoos"
                        leaderAvatarUrl="https://github.com/zizimoos.png"
                        positions={[
                            "React developer",
                            "Backend developer",
                        ]}
                        projectDescription="AI-powered personal project"
                    />
                ))}
            </div>
        </div>
    )
}