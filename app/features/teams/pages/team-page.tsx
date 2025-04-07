import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import { Button } from "~/common/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "~/common/components/ui/card";
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";
export const meta: Route.MetaFunction = () => [
    { title: "Team Details | wemake" },
];

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    try {
        const team = await getTeamById(client, { teamId: params.teamId });
        return { team };
    } catch (error) {
        if (error instanceof Error && error.message === 'PGRST116') {
            console.log('데이터가 존재하지 않습니다.');
            return { team: null };
        } else {
            console.error('에러 발생:', error);
            return { team: null };
        }
    }
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero title={`Join ${loaderData.team?.team_leader.username}'s team`} description={`Join ${loaderData.team?.team_leader.username}'s team to find a team mate.`} />
            <div className="grid grid-cols-6 gap-40 items-start">
                <div className="col-span-4 grid grid-cols-4 gap-5">
                    {[
                        {
                            title: "Product name",
                            value: loaderData.team?.product_name,
                        },
                        {
                            title: "Stage",
                            value: loaderData.team?.product_stage,
                        },
                        {
                            title: "Team size",
                            value: loaderData.team?.team_size,
                        },
                        {
                            title: "Available equity",
                            value: `${loaderData.team?.equity_split}%`,
                        },
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                                <CardContent className="p-0 font-bold text-2xl capitalize">
                                    <p>{item.value}</p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Looking for
                            </CardTitle>
                            <CardContent className="p-0 font-bold text-2xl">
                                <ul className="text-lg list-disc list-inside">
                                    {loaderData.team?.roles.split(",").map((item: string) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>
                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Idea description
                            </CardTitle>
                            <CardContent className="p-0 font-medium text-xl">
                                <p>{loaderData.team?.product_description}</p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{loaderData.team?.team_leader.name.charAt(0)}</AvatarFallback>
                            <AvatarImage src={loaderData.team?.team_leader.avatar_url ?? "https://github.com/zizimoos.png"} />
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">{loaderData.team?.team_leader.username}</h4>
                            <Badge variant="secondary" className="capitalize">{loaderData.team?.team_leader.role}</Badge>
                        </div>
                    </div>
                    <Form className="space-y-5">
                        <InputPair
                            label="Introduce yourself"
                            description="Tell us about yourself"
                            name="introduction"
                            type="text"
                            id="introduction"
                            required
                            textArea
                            placeholder="i.e. I'm a React Developer with 3 years of experience"
                        />
                        <Button type="submit" className="w-full">
                            Get in touch
                        </Button>
                    </Form>
                </aside>
            </div>
        </div>
    );
}