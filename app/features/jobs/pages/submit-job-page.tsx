import { Form, redirect } from "react-router";
import { Hero } from "~/common/components/hero";
import { useForm } from "react-hook-form";
import type { Route } from "./+types/submit-job-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { jobType } from "../schema";
import { createJob } from "../mutations";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit a Job" },
        { name: "description", content: "Submit a job to the job board" },
    ];
};
export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
};

export const formSchema = z.object({
    position: z.string().max(40),
    overview: z.string().max(400),
    responsibilities: z.string().max(400),
    qualifications: z.string().max(400),
    benefits: z.string().max(400),
    skills: z.string().max(400),
    companyName: z.string().max(40),
    companyLogoUrl: z.string().max(40),
    companyLocation: z.string().max(40),
    applyUrl: z.string().max(40),
    jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]),
    jobLocation: z.enum(
        LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]
    ),
    salaryRange: z.enum(SALARY_RANGES.map((range) => range.value) as [string, ...string[]]),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            fieldErrors: error.flatten().fieldErrors,
        };
    }
    const { job_id } = await createJob(client, data);
    return redirect(`/jobs/${job_id}`);
};

export default function SubmitJobPage({ actionData }: Route.ComponentProps) {
    const form = useForm();

    return (
        <div>
            <Hero
                title="Submit a Job"
                description="Submit a job to the job board"
            />
            <Form
                className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto"
                method="post"
            >
                <div className="space-y-10">
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-10">
                        <InputPair
                            id="position"
                            label="Job Title"
                            name="position"
                            description="The title of the position you're hiring for"
                            placeholder="Software Engineer"
                            defaultValue="Software Engineer"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.position}</p>
                        )}
                        <InputPair
                            id="overview"
                            label="Overview"
                            name="overview"
                            description="A brief overview of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            defaultValue="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.overview}</p>
                        )}
                        <InputPair
                            id="responsibilities"
                            label="Responsibilities"
                            name="responsibilities"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            defaultValue="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.responsibilities}</p>
                        )}
                        <InputPair
                            id="qualifications"
                            label="Qualifications"
                            name="qualifications"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            defaultValue="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.qualifications}</p>
                        )}
                        <InputPair
                            id="benefits"
                            label="Benefits"
                            name="benefits"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            defaultValue="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.benefits}</p>
                        )}
                        <InputPair
                            id="skills"
                            label="Skills"
                            name="skills"
                            description="The skills required for the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            defaultValue="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.skills}</p>
                        )}
                        <InputPair
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            description="The name of the company hiring for the position"
                            placeholder="Google"
                            defaultValue="Google"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.companyName}</p>
                        )}
                        <InputPair
                            id="companyLogoUrl"
                            label="Company Logo URL"
                            name="companyLogoUrl"
                            description="The URL of the company logo"
                            placeholder="https://example.com/logo.png"
                            defaultValue="https://example.com/logo.png"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.companyLogoUrl}</p>
                        )}
                        <InputPair
                            id="companyLocation"
                            label="Company Location"
                            name="companyLocation"
                            description="The location of the company"
                            placeholder="San Francisco, CA"
                            defaultValue="San Francisco, CA"
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.companyLocation}</p>
                        )}
                        <InputPair
                            id="companyWebsiteUrl"
                            label="Company Website URL"
                            name="companyWebsiteUrl"
                            description="The URL of the company website"
                            placeholder="https://example.com"
                            defaultValue="https://example.com"
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
                        )}
                        <InputPair
                            id="applyUrl"
                            label="Apply URL"
                            name="applyUrl"
                            description="The URL to apply for the job"
                            placeholder="https://example.com/apply"
                            defaultValue="https://example.com/apply"
                            required
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.applyUrl}</p>
                        )}
                        <SelectPair
                            id="jobType"
                            label="Job Type"
                            name="jobType"
                            required
                            placeholder="Select a job type"
                            description="The type of job"
                            options={JOB_TYPES.map(
                                (type) => ({
                                    label: type.label,
                                    value: type.value,
                                })
                            )}
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.jobType}</p>
                        )}
                        <SelectPair
                            id="location"
                            label="Location"
                            name="jobLocation"
                            required
                            placeholder="Select a location"
                            description="The location of the job"
                            options={LOCATION_TYPES.map(
                                (location) => ({
                                    label: location.label,
                                    value: location.value,
                                })
                            )}
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.jobLocation}</p>
                        )}
                        <SelectPair
                            id="salaryRange"
                            label="Salary Range"
                            name="salaryRange"
                            required
                            placeholder="Select a salary range"
                            description="The salary range of the job"
                            options={SALARY_RANGES.map(
                                (range) => ({
                                    label: range.label,
                                    value: range.value,
                                })
                            )}
                        />
                        {actionData && "fieldErrors" in actionData && (
                            <p className="text-red-500">{actionData.fieldErrors.salaryRange}</p>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-1/2">post job for free</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
} 