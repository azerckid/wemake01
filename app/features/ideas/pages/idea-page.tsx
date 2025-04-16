import { DotIcon } from "lucide-react";
import { EyeIcon } from "lucide-react";
import { HeartIcon } from "lucide-react";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/idea-page";
import { getGptIdea } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { Form, redirect } from "react-router";
import { claimIdea } from "../mutations";

export const meta = ({
    data: {
        idea,
    },
}: Route.MetaArgs) => {
    if (!idea) {
        return [
            { title: "Idea Not Found | wemake" },
            { name: "description", content: "The requested idea could not be found" },
        ];
    }

    return [
        { title: `Idea #${idea.gpt_idea_id}: ${idea.idea} | wemake` },
        { name: "description", content: "Find ideas for your next project" },
    ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    const idea = await getGptIdea(client, { ideaId: params.ideaId });
    if (idea?.is_claimed) {
        throw redirect(`/ideas`);
    }
    return { idea };
};

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const idea = await getGptIdea(client, { ideaId: params.ideaId });
    if (idea?.is_claimed) {
        return { ok: false };
    }
    await claimIdea(client, { ideaId: params.ideaId, userId });
    return redirect(`/my/dashboard/ideas`);
};

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
    if (!loaderData.idea) {
        return (
            <div className="space-y-2">
                <Hero title="Idea Not Found" description="The requested idea could not be found" />
            </div>
        );
    }

    return (
        <div>
            <Hero title={`Idea #${loaderData.idea.gpt_idea_id}`} description={loaderData.idea.idea ?? ""} />
            <div className="max-w-prose mx-auto flex flex-col items-center gap-4">
                <div className="italic text-center">"{loaderData.idea.idea}"</div>
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
                    {loaderData.idea.is_claimed ? null : (
                        <Form method="post">
                            <Button size="lg">Claim idea</Button>
                        </Form>
                    )}
                </div>
            </div>
        </div>
    );
} 