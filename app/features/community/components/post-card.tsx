import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
    id: string;
    title: string;
    author: string;
    authorAvatarUrl: string | null;
    authorAvatarFallback: string;
    category: string;
    postedAt: string;
    expanded?: boolean;
    votesCount?: number;
}

export function PostCard({
    id,
    title,
    author,
    authorAvatarUrl,
    authorAvatarFallback,
    category,
    postedAt,
    expanded,
    votesCount = 0, }: PostCardProps) {
    const formattedDate = DateTime.fromJSDate(new Date(postedAt)).toRelative();

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
                    <CardFooter className="flex justify-end  pb-0">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{votesCount}</span>
                        </Button>
                    </CardFooter>
                )}
            </Card>
        </Link>
    );
} 