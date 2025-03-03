import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/ideas-page";
import { IdeaCard } from "../components/idea-card";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "IdeasGPT | wemake" },
        { name: "description", content: "Browse and vote on product ideas" },
    ];
};

export default function IdeasPage({ loaderData }: Route.ComponentProps) {

    return (
        <div className="space-y-20">
            <Hero title="IdeasGPT" description="Browse and vote on product ideas" />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 11 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id={`ideaId-${index}`}
                        title="A startup that create an AI-powered generated personal trainer, delivering customized fitness recommendations and tracking of progress using a mobile app to track workouts and progress as well as website to manage the business."
                        viewCount={100}
                        postedAt="12 hours ago"
                        likeCount={100}
                        claimed={index % 2 === 0}
                    />
                ))}

            </div>
        </div>
    );
} 