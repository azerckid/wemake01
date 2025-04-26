import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Link, useFetcher } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
    id: string | null | undefined;
    title: string | null | undefined;
    author: string | null | undefined;
    authorAvatarUrl: string | null;
    authorAvatarFallback: string | null | undefined;
    category: string | null | undefined;
    postedAt: string | null | undefined;
    expanded?: boolean;
    votesCount?: number;
    isUpvoted?: boolean;
}

export function PostCard({
    id = '',
    title = 'Untitled',
    author = 'Anonymous',
    authorAvatarUrl,
    authorAvatarFallback = 'A',
    category = 'Uncategorized',
    postedAt = new Date().toISOString(),
    expanded,
    votesCount = 0,
    isUpvoted = false,
}: PostCardProps) {
    const formattedDate = postedAt ? DateTime.fromJSDate(new Date(postedAt)).toRelative() : '';
    const fetcher = useFetcher();
    const optimisitcVotesCount =
        fetcher.state === "idle"
            ? votesCount
            : isUpvoted
                ? votesCount - 1
                : votesCount + 1;
    const optimisitcIsUpvoted = fetcher.state === "idle" ? isUpvoted : !isUpvoted;
    const absorbClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetcher.submit(null, {
            method: "POST",
            action: `/community/${id}/upvote`,
        });
    };
    return (
        <Link to={`/community/${id}`} className="block">
            <Card
                className={cn(
                    "bg-transparent hover:bg-card/50 transition-colors",
                    expanded ? "flex flex-row items-center justify-between" : ""
                )}
            >
                <CardHeader className="flex flex-row items-center gap-2">
                    <Avatar className="w-14 h-14">
                        <AvatarFallback>{authorAvatarFallback}</AvatarFallback>
                        {authorAvatarUrl && <AvatarImage src={authorAvatarUrl} />}
                    </Avatar>
                    <div className="space-y-2">
                        <CardTitle>
                            {title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground leading-tight">
                            <span>{author} on</span>
                            <span>{category}</span>
                            <DotIcon className="w-4 h-4" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>
                </CardHeader>
                {!expanded && (
                    <CardFooter className="flex justify-end">
                        <Button variant="link">Reply &rarr;</Button>
                    </CardFooter>
                )}
                {expanded && (
                    <CardFooter className="flex justify-end pb-0">
                        <Button
                            onClick={absorbClick}
                            variant="outline"
                            className={cn(
                                optimisitcIsUpvoted ? "border-primary text-primary" : ""
                            )}
                        >
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{optimisitcVotesCount}</span>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
} 