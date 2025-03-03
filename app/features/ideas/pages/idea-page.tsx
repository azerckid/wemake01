import { DotIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { HeartIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";

export const meta = () => {
    return [
        { title: "IdeasGPT | wemake" },
        { name: "description", content: "Find ideas for your next project" },
    ];
}

export default function IdeaPage() {

    return (
        <div className="space-y-2">
            <Hero title="IdeasGPT" description="Browse and vote on product ideas" />
            <div className="max-w-prose mx-auto flex flex-col gap-4">
                <p className="italic text-center">
                    "A startup that create an AI-powered generated personal trainer,
                    delivering customized fitness recommendations and tracking of progress
                    using a mobile app to track workouts and progress as well as website to manage the business.
                    "
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <EyeIcon className="w-4 h-4" />
                        <span className="text-sm text-muted-foreground">100 views</span>
                    </div>
                    <DotIcon className="w-4 h-4" />
                    <span className="text-sm text-muted-foreground">12 hours ago</span>
                    <DotIcon className="w-4 h-4" />
                    <Button variant="outline" size="sm">
                        <HeartIcon className="w-4 h-4" />
                        <span className="text-sm text-muted-foreground">100 likes</span>
                    </Button>
                </div>
                <div className="flex justify-center w-full">
                    <Button size="default">claim idea now &rarr;</Button>
                </div>
            </div>
        </div>
    );
} 