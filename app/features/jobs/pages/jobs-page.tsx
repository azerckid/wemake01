import { Button } from "~/common/components/ui/button";
import { JobCard } from "../components/job-card";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Link, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Jobs | wemake" },
        { name: "description", content: "Browse and apply for jobs" },
    ];
};

export default function JobsPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const onFilterClick = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    return (
        <div className="space-y-20">
            <Hero title="Jobs" description="companies looking for makers" />
            <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
                    {Array.from({ length: 11 }).map((_, index) => (
                        <JobCard
                            key={index}
                            id={`jobId-${index}`}
                            company="Company Name"
                            companyLogoUrl="https://github.com/apple.png"
                            companyHQ="New York, NY"
                            title="Software Engineer"
                            postedAt="12 hours ago"
                            type="Full-time"
                            isRemote={true}
                            salary={{ min: 100000, max: 120000, currency: "USD" }}
                        />
                    ))}
                </div>
                <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
                    <div className="flex flex-col gap-2.5 items-start">
                        <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPES.map((jobType) => (
                                <Button
                                    variant="outline"
                                    className={cn(searchParams.get("type") === jobType.value && "bg-primary text-primary-foreground")}
                                    onClick={() => onFilterClick("type", jobType.value)} >
                                    {jobType.label}
                                </Button>
                            ))}
                        </div>
                        <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
                        <div className="flex flex-wrap gap-2">
                            {LOCATION_TYPES.map((locationType) => (
                                <Button
                                    variant="outline"
                                    className={cn(searchParams.get("location") === locationType.value && "bg-primary text-primary-foreground")}
                                    onClick={() => onFilterClick("location", locationType.value)}>
                                    {locationType.label}
                                </Button>
                            ))}
                        </div>
                        <h4 className="text-sm text-muted-foreground font-bold">Salary</h4>
                        <div className="flex flex-wrap gap-2">
                            {SALARY_RANGES.map((salaryRange) => (
                                <Button
                                    variant="outline"
                                    className={cn(searchParams.get("salary") === salaryRange.value && "bg-primary text-primary-foreground")}
                                    onClick={() => onFilterClick("salary", salaryRange.value)}>
                                    {salaryRange.label}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 