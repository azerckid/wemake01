import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/common/components/ui/card";
import { Link } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

interface JobCardProps {
    id: string;
    company: string;
    companyLogoUrl: string;
    companyHQ: string;
    title: string;
    postedAt: string;
    type: string;
    isRemote: boolean;
    salary: {
        min: number;
        max: number;
        currency: string;
    };
}

export function JobCard({ id, company, companyLogoUrl, companyHQ, title, postedAt, type, isRemote, salary }: JobCardProps) {
    return (
        <Link to={`/jobs/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-all duration-300">
                <CardHeader>
                    <div className="flex items-center gap-2 mb-4">
                        <img src={companyLogoUrl} alt={company} className="size-10 rounded-full" />
                        <div className="space-x-2">
                            <span className="text-sm text-accent-foreground">{company}</span>
                            <span className="text-xs text-muted-foreground">{postedAt}</span>
                        </div>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="outline">{type}</Badge>
                    {isRemote && <Badge variant="outline">Remote</Badge>}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                    <div className="flex flex-col items-start">
                        <span className="text-sm text-muted-foreground">
                            {salary.currency}{salary.min.toLocaleString()} - {salary.currency}{salary.max.toLocaleString()}
                        </span>
                        <span className="text-sm text-muted-foreground">{companyHQ}</span>
                    </div>
                    <Button variant="outline">Apply</Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 