import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { JobCard } from "../components/job-card";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Link, useSearchParams, data } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs, getJobById } from "../queries";
import { z } from "zod";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Jobs | wemake" },
        { name: "description", content: "Browse and apply for jobs" },
    ];
};

const searchParamsSchema = z.object({
    type: z
        .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
        .optional(),
    location: z
        .enum(LOCATION_TYPES.map((type) => type.value) as [string, ...string[]])
        .optional(),
    salary: z.enum(SALARY_RANGES.map((type) => type.value) as [string, ...string[]])
        .optional(),
});

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const { client, headers } = makeSSRClient(request);
    const { success, data: parsedData } = searchParamsSchema.safeParse(
        Object.fromEntries(url.searchParams)
    );
    if (!success) {
        throw data(
            {
                error_code: "invalid_search_params",
                message: "Invalid search params",
            },
            { status: 400 }
        );
    }
    const jobs = await getJobs(client, {
        limit: 40,
        location: parsedData.location,
        type: parsedData.type,
        salary: parsedData.salary,
    });
    const job = await getJobById(client, { jobId: params.jobId ? parseInt(params.jobId) : 0 });
    return { jobs, job };
};

const getSalaryFromRange = (range: string) => {
    switch (range) {
        case "less-than-50k": return { min: 0, max: 50000, currency: "USD" };
        case "50k-100k": return { min: 50000, max: 100000, currency: "USD" };
        case "100k-150k": return { min: 100000, max: 150000, currency: "USD" };
        case "150k-200k": return { min: 150000, max: 200000, currency: "USD" };
        case "200k-300k": return { min: 200000, max: 300000, currency: "USD" };
        case "300k-400k": return { min: 300000, max: 400000, currency: "USD" };
        case "400k-500k": return { min: 400000, max: 500000, currency: "USD" };
        case "500k-600k": return { min: 500000, max: 600000, currency: "USD" };
        case "600k-700k": return { min: 600000, max: 700000, currency: "USD" };
        case "700k-800k": return { min: 700000, max: 800000, currency: "USD" };

        default: return { min: 0, max: 0, currency: "USD" };
    }
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
                    {loaderData.jobs.map((job) => (
                        <JobCard
                            key={job.job_id}
                            id={job.job_id}
                            company={job.company_name}
                            companyLogoUrl={job.company_logo_url ? job.company_logo_url : "https://github.com/apple.png"}
                            companyHQ={job.company_location}
                            title={job.title}
                            postedAt={job.created_at}
                            type={job.job_type}
                            isRemote={job.location_type === "remote"}
                            salary={getSalaryFromRange(job.salary_range)}
                        />
                    ))}
                </div>
                <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
                    <div className="flex flex-col gap-2.5 items-start">
                        <div className="flex items-center justify-between w-full">
                            <h4 className="text-sm text-muted-foreground font-bold">Filters</h4>
                            {(searchParams.get("type") || searchParams.get("location") || searchParams.get("salary")) && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500 hover:text-red-600"
                                    onClick={() => {
                                        searchParams.delete("type");
                                        searchParams.delete("location");
                                        searchParams.delete("salary");
                                        setSearchParams(searchParams);
                                    }}
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>
                        <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                        <div className="flex flex-wrap gap-2">
                            {JOB_TYPES.map((jobType) => (
                                <Button
                                    key={jobType.value}
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
                                    key={locationType.value}
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
                                    key={salaryRange.value}
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