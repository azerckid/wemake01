import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "~/common/components/ui/card";
import { Link } from "react-router";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";

interface ProductCardProps {
    id: number;
    name: string;
    description: string;
    upvoteCount: number;
    reviewsCount: number;
    viewsCount: number;
    votesCount: number;
}

export function ProductCard({ id, name, description, upvoteCount, reviewsCount, viewsCount, votesCount }: ProductCardProps) {
    return (
        <Link to={`/products/${id}`} className="block" id={`product-${id}`}>
            <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50 transition-all duration-300">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{name}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <MessageCircleIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-primary">{reviewsCount}</span> reviews
                        </div>
                        <div className="flex items-center gap-px text-xs text-muted-foreground">
                            <EyeIcon className="w-4 h-4 text-muted-foreground" />
                            <span className="text-primary">{viewsCount}</span> views
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                </CardContent>
                <CardFooter className="py-0">
                    <Button variant="outline" className="w-full flex flex-col h-14">
                        <ChevronUpIcon className="w-4 h-4 shrink-0" />
                        <span className="text-sm font-medium">{votesCount}</span>
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 