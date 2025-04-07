import { PostCard } from "~/features/community/components/post-card";
import type { Route } from "./+types/profile-posts-page";
import { getUserPosts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const posts = await getUserPosts(client, { username: params.username });
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