import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";
import type { Route } from "./+types/job-page";
import { Button } from "~/common/components/ui/button";
import { getJobById } from "../queries";
import { DateTime } from "luxon";

export const meta: Route.MetaFunction = () => {
    return [{
        title: "Job Details",
    }]
}
export const loader = async ({ params }: Route.LoaderArgs) => {
    const job = await getJobById(params.jobId);
    return { job };
};

export default function JobPage({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
            <div className="grid grid-cols-6 gap-20 items-start -mt-20">
                <div className="col-span-4 space-y-10">
                    <div className="flex flex-col gap-2">
                        <div className="rounded-full border-2 border-white size-40 relative left-10 bg-white overflow-hidden">
                            <img src={loaderData.job.company_logo_url ? loaderData.job.company_logo_url : "https://github.com/apple.png"} alt="apple"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-4xl font-bold">{loaderData.job.title}</h1>
                        <p className="text-sm text-muted-foreground">{loaderData.job.company_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-white">{loaderData.job.job_type}</Badge>
                        <Badge className="bg-primary text-white">{loaderData.job.location_type}</Badge>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Overview</h4>
                        <p className="text-lg text-muted-foreground">
                            {loaderData.job.overview}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Responsibilities</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {(loaderData.job.responsibilities.split(",")).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Qualifications</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {(loaderData.job.qualifications.split(",")).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Benefits</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {(loaderData.job.benefits.split(",")).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Skills</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {(loaderData.job.skills.split(",")).map((item: string) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 space-y-4 mt-20 sticky top-20 border rounded-lg p-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground font-bold">
                            Salary: ${loaderData.job.salary_range}
                        </span>
                        <span className="text-sm text-muted-foreground font-bold">
                            Avg. Salary: ${loaderData.job.salary_range}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground font-bold capitalize">
                            Location: {loaderData.job.location_type}
                        </span>
                        <span className="text-sm text-muted-foreground font-bold capitalize">
                            Type: {loaderData.job.job_type}
                        </span>
                    </div>
                    <div className="flex">
                        <span className="text-sm text-muted-foreground font-bold">
                            Posted: {DateTime.fromISO(loaderData.job.created_at).toRelative()}
                        </span>
                        <DotIcon className="size-4" />
                    </div>
                    <Button className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    );
} 