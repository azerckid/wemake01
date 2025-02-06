import type { MetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { Button } from "../components/ui/button";
import { Link } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";

export const meta: MetaFunction = () => {
    return [
        { title: "Home | wemake" },
        { name: "description", content: "Home page welcome to our app" }
    ]
}

export default function HomePage() {
    return (
        <div className="px-20 space-y-40">
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-sm text-muted-foreground">the best products made by our community today.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/products/leaderboard">Explore all products &rarr;</Link>
                    </Button>
                </div>

                {Array.from({ length: 10 }).map((_, index) => (
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

            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
                    <p className="text-sm text-muted-foreground">The latest discussions from our community.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/community">Explore all discussions &rarr;</Link>
                    </Button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <PostCard
                        key={index}
                        id={`postId-${index}`}
                        title="What is the best way to learn React?"
                        author="zizi"
                        authorAvatarUrl="https://github.com/apple.png"
                        authorAvatarFallback="CN"
                        category="Productivity"
                        postedAt="12 hours ago"
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
                    <p className="text-sm text-muted-foreground">Find ideas for your next project.</p>
                    <Button variant="link" asChild className="text-lg p-0">
                        <Link to="/community" className="text-red-500">Explore all ideas &rarr;</Link>
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
        </div>
    )
}