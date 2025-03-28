import { DotIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { HeartIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/idea-page";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";

export const meta = ({
    data: {
        idea: { gpt_idea_id, idea },
    },
}: Route.MetaArgs) => {
    return [
        { title: `Idea #${gpt_idea_id}: ${idea} | wemake` },
        { name: "description", content: "Find ideas for your next project" },
    ];
}

export const loader = async ({ params }: Route.LoaderArgs) => {
    const idea = await getGptIdea(params.ideaId);
    return { idea };
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-2">
            <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} description={loaderData.idea.idea ?? ""} />
            <div className="max-w-prose mx-auto flex flex-col gap-4">
                <p className="italic text-center">"{loaderData.idea.idea}"</p>
                <div className="flex items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <EyeIcon className="w-4 h-4" />
                        <span>{loaderData.idea.views}</span>
                    </div>
                    <DotIcon className="w-4 h-4" />
                    <span>{DateTime.fromISO(loaderData.idea.created_at ?? "").toRelative()}</span>
                    <DotIcon className="w-4 h-4" />
                    <Button variant="outline" size="sm">
                        <HeartIcon className="w-4 h-4" />
                        <span>{loaderData.idea.likes}</span>
                    </Button>
                </div>
                <div className="flex justify-center w-full">
                    <Button size="default">claim idea now &rarr;</Button>
                </div>
            </div>
        </div>
    );
} 