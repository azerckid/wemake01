import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";

export const loader = async ({ params }: Route.LoaderArgs) => {
    const posts = await getUserPosts(params.username);
    console.log(posts);
    return { posts };
};

export default function ProfilePostsPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="flex flex-col gap-5">
            {loaderData.posts.map((post) => (
                <PostCard
                    key={post.post_id}
                    id={post.post_id.toString()}
                    title={post.title}
                    author={post.author}
                    authorAvatarUrl={post.authoravatarurl}
                    authorAvatarFallback={post.author.charAt(0)}
                    category={post.topic}
                    postedAt={post.created_at}
                    expanded
                />
            ))}
        </div>
    );
}