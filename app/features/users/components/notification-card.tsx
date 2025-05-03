import {
    Card,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/common/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon, } from "lucide-react";
import { cn } from "~/lib/utils";
import { Link, useFetcher } from "react-router";

interface NotificationCardProps {
    avatarUrl: string;
    avatarFallback: string;
    userName: string;
    timestamp: string;
    seen: boolean;
    type: "follow" | "review" | "reply";
    productName?: string;
    postTitle?: string;
    payloadId?: number;
    id: number;
}

export function NotificationCard({
    avatarUrl,
    avatarFallback,
    userName,
    timestamp,
    seen,
    type,
    productName,
    postTitle,
    payloadId,
    id
}: NotificationCardProps) {
    const getMessage = (type: "follow" | "review" | "reply") => {
        switch (type) {
            case "follow":
                return " followed you.";
            case "review":
                return " reviewed your product: ";
            case "reply":
                return " replied to your post: ";
        }
    };

    const fetcher = useFetcher();
    const optimiscitSeen = fetcher.state === "idle" ? seen : true;
    return (
        <Card
            className={cn("min-w-[450px]", optimiscitSeen ? "" : "bg-yellow-500/60")}
        >
            <CardHeader className="flex flex-row gap-5 space-y-0 items-start">
                <Avatar className="">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg space-y-0 font-bold">
                        <span>{userName}</span>
                        <span>{getMessage(type)}</span>
                        {/* <div className="flex flex-col gap-2">
                            <span>payloadId: {payloadId}</span>
                            <span>productName: {productName}</span>
                            <span>postTitle: {postTitle}</span>
                        </div> */}
                        {productName && (
                            <Button variant={"outline"} asChild className="text-lg">
                                <Link to={`/products/${payloadId}`}>{productName ? productName : "product"}</Link>
                            </Button>
                        )}
                        {postTitle && (
                            <Button variant={"outline"} asChild className="text-lg">
                                <Link to={`/community/${payloadId}`}>{postTitle ? postTitle : "post"}</Link>
                            </Button>
                        )}
                    </CardTitle>
                    <small className="text-muted-foreground text-sm">{timestamp}</small>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
                {optimiscitSeen ? null : (
                    <fetcher.Form method="post" action={`/my/notifications/${id}/see`}>
                        <Button variant="outline" size="icon">
                            <EyeIcon className="w-4 h-4" />
                        </Button>
                    </fetcher.Form>
                )}
            </CardFooter>
        </Card>
    );
}