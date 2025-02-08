import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "~/common/components/ui/avatar";
import { ArrowRight } from "lucide-react";

interface TeamCardProps {
    id: string;
    leader: {
        username: string;
        avatarUrl: string;
        avatarFallback: string;
    };
    roles: string[];
    projectDescription: string;
}

export function TeamCard({ id, leader, roles, projectDescription }: TeamCardProps) {
    return (
        <Link to={`/teams/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-color duration-300">
                <CardHeader className="flex flex-row items-center gap-2">
                    <CardTitle className="text-base leading-loose">
                        <Badge variant="secondary" className="inline-flex shadow-sm items-center gap-2 text-base">
                            <span className="text-sm">
                                @{leader.username}
                            </span>
                            <Avatar className="size-5">
                                <AvatarFallback>{leader.avatarFallback}</AvatarFallback>
                                <AvatarImage src={leader.avatarUrl} />
                            </Avatar>
                        </Badge>
                        <span>is looking for</span>
                        {roles.map((role) => (
                            <Badge key={role} className="text-sm mx-1">{role}</Badge>
                        ))}
                        <span>to build</span>
                        <span> {projectDescription}</span>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-end">
                    <Button variant="link">
                        <span>Join team</span>
                        <ArrowRight className="size-4" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 