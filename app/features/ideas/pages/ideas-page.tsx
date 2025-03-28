import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "IdeasGPT | wemake" },
        { name: "description", content: "Browse and vote on product ideas" },
    ];
};

export const loader = async () => {
    const ideas = await getGptIdeas({ limit: 20 });
    return { ideas };
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero title="IdeasGPT" description="Browse and vote on product ideas" />
            <div className="grid grid-cols-4 gap-4">
                {loaderData.ideas.map((idea) => (
                    <IdeaCard
                        key={idea.gpt_idea_id}
                        id={Number(idea.gpt_idea_id)}
                        title={idea.idea ?? ""}
                        viewCount={Number(idea.views)}
                        postedAt={idea.created_at ?? ""}
                        likeCount={Number(idea.likes)}
                        claimed={idea.is_claimed ?? false}
                    />
                ))}

            </div>
        </div>
    );
} 