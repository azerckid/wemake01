import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/common/components/ui/card";
import { Link } from "react-router";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
    id: number;
    title: string;
    viewCount: number;
    postedAt: string;
    likeCount: number;
    claimed?: boolean;
}

export function IdeaCard({ id, title, viewCount, postedAt, likeCount, claimed }: IdeaCardProps) {
    return (
        <Card className="bg-transparent hover:bg-card/50 transition-all duration-300">
            <CardHeader>
                <Link to={`/ideas/${id}`}>
                    <CardTitle className="text-lg">
                        <span className={cn(claimed ?
                            "bg-muted-foreground selection:bg-muted-foreground text-muted-foreground"
                            : "")}>{title}</span>

                    </CardTitle>
                </Link>
            </CardHeader>
            <CardContent className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <EyeIcon className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">{viewCount} views</span>
                </div>
                <DotIcon className="w-4 h-4" />
                <span>{DateTime.fromISO(postedAt).toRelative()}</span>
            </CardContent>
            <CardFooter className="flex items-center gap-2 justify-end">
                <Button variant="outline">
                    <HeartIcon className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">{likeCount} likes</span>
                </Button>
                {!claimed ? (
                    <Button asChild>
                        <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
                    </Button>
                ) : (
                    <Button variant="secondary" disabled className="cursor-not-allowed">
                        <LockIcon className="w-4 h-4" />
                        Claimed
                    </Button>
                )}

            </CardFooter>
        </Card>
    );
} 