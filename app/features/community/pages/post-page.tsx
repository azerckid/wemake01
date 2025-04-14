import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "~/common/components/ui/breadcrumb";
import type { Route } from "./+types/post-page";
import { Form, Link } from "react-router";
import { ChevronUpIcon, DotIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Reply } from "~/features/community/components/reply";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ data }) => {
    if (!data?.post) {
        return [{ title: "Post not found | wemake" }];
    }
    return [{ title: `${data.post.title} on ${data.post.topic?.name || 'Unknown Topic'} | wemake` }];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const post = await getPostById(client, { postId: params.postId });
    const replies = await getReplies(client, { postId: params.postId });
    return { post, replies };
};

export default function PostPage({ loaderData }: Route.ComponentProps) {
    if (!loaderData?.post) {
        return <div>Post not found</div>;
    }

    // Extract topic data safely
    const topicSlug = loaderData.post.topic?.slug || '';
    const topicName = loaderData.post.topic?.name || '';
    const authorUsername = loaderData.post.profile?.username || '';
    const authorAvatarUrl = loaderData.post.profile?.avatar_url || '';
    const authorRole = loaderData.post.profile?.role || '';
    const authorCreatedAt = loaderData.post.profile?.created_at || '';
    const upvotes = 0; // Default value for upvotes
    const replies = 0; // Default value for replies
    const products = 0; // Default value for products

    return (
        <div className="space-y-10">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community">Community</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community?topic=${topicSlug}`}>{topicName}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community/${loaderData.post.post_id}`}>
                                {loaderData.post.title}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="grid grid-cols-6 gap-40 items-start " >
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{upvotes}</span>
                        </Button>
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">
                                    {loaderData.post.title}
                                </h2>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{authorUsername}</span>
                                <DotIcon className="size-5" />
                                {DateTime.fromISO(loaderData.post.created_at, {
                                    zone: "utc",
                                }).toRelative({ unit: "hours" })}
                                <DotIcon className="size-5" />
                                <span>{replies} replies</span>
                            </div>
                            <p className="text-muted-foreground w-3/4">{loaderData.post.content}</p>
                        </div>
                    </div>
                    <Form className="flex items-start gap-5 w-3/4">
                        <Avatar className="size-14">
                            <AvatarFallback>N</AvatarFallback>
                            <AvatarImage src={authorAvatarUrl} />
                        </Avatar>
                        <div className="flex flex-col gap-5 items-end w-full">
                            <Textarea
                                placeholder="Write a reply"
                                className="w-full resize-none"
                                rows={5}
                            />
                            <Button>Reply</Button>
                        </div>
                    </Form>
                    <div className="space-y-10">
                        <h4 className="font-semibold">{replies} Replies</h4>
                        <div className="flex flex-col gap-5">
                            {loaderData.replies.map((reply) => (
                                <Reply
                                    key={reply.post_reply_id}
                                    username={reply.user.name}
                                    avatarUrl={reply.user.avatar_url}
                                    content={reply.reply}
                                    timestamp={reply.created_at}
                                    topLevel={true}
                                    replies={reply.post_replies}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{authorUsername[0]}</AvatarFallback>
                            {authorAvatarUrl ? (
                                <AvatarImage src={authorAvatarUrl} />
                            ) : null}
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <h4 className="text-lg font-medium">
                                {authorUsername}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {authorRole}
                            </Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>🎂 Joined {DateTime.fromISO(loaderData.post.profile?.created_at || '', {
                            zone: "utc",
                        }).toRelative({ unit: "hours" })}{" "} ago</span>
                        <span>🚀 Launched {products} products</span>
                    </div>
                    <Button variant="outline" className="w-full">
                        Follow
                    </Button>
                </aside>
            </div>
        </div >
    );
}