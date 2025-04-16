import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/common/components/ui/card";
import { Link } from "react-router";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface IdeaCardProps {
    id: number;
    title: string;
    owner?: boolean;
    viewsCount?: number;
    postedAt?: string;
    likesCount?: number;
    claimed?: boolean;
}

export function IdeaCard({ id, title, owner, viewsCount, postedAt, likesCount, claimed }: IdeaCardProps) {
    return (
        <Card className="bg-transparent hover:bg-card/50 transition-all duration-300">
            <CardHeader>
                <Link to={claimed || owner ? "" : `/ideas/${id}`}>
                    <CardTitle className="text-lg">
                        <span className={cn(
                            claimed
                                ? "bg-muted-foreground break-all selection:bg-muted-foreground text-muted-foreground"
                                : ""
                        )}
                        >
                            {title}
                        </span>

                    </CardTitle>
                </Link>
            </CardHeader>
            {owner ? null : (
                <CardContent className="flex items-center text-sm">
                    <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4" />
                        <span>{viewsCount}</span>
                    </div>
                    <DotIcon className="w-4 h-4" />
                    {postedAt ? (
                        <span>{DateTime.fromISO(postedAt).toRelative()}</span>
                    ) : null}
                </CardContent>
            )}
            <CardFooter className="flex justify-end gap-2">
                {!claimed && !owner ? (
                    <>
                        <Button variant="outline">
                            <HeartIcon className="w-4 h-4" />
                            <span>{likesCount}</span>
                        </Button>
                        <Button asChild>
                            <Link to={`/ideas/${id}`}>Claim idea now &rarr;</Link>
                        </Button>
                    </>
                ) : (
                    <Button variant="secondary" disabled className="cursor-not-allowed">
                        <LockIcon className="w-4 h-4" />
                        Claimed
                    </Button>
                )}

            </CardFooter>
        </Card >
    );
} 