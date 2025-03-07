import { Form } from "~/common/components/ui/form";
import { Hero } from "~/common/components/hero";
import { useForm } from "react-hook-form";
import type { Route } from "./+types/submit-job-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "../constants";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit a Job" },
        { name: "description", content: "Submit a job to the job board" },
    ];
};

export default function SubmitJobPage() {
    const form = useForm();

    return (
        <div>
            <Hero
                title="Submit a Job"
                description="Submit a job to the job board"
            />
            <Form {...form}>
                <div className="space-y-10">
                    <div className="grid grid-cols-3 md:grid-cols-2 gap-10">
                        <InputPair
                            id="title"
                            label="Job Title"
                            name="title"
                            description="The title of the position you're hiring for"
                            placeholder="Software Engineer"
                            required
                        />
                        <InputPair
                            id="overview"
                            label="Overview"
                            name="overview"
                            description="A brief overview of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        <InputPair
                            id="responsibilities"
                            label="Responsibilities"
                            name="responsibilities"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        <InputPair
                            id="qualifications"
                            label="Qualifications"
                            name="qualifications"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        <InputPair
                            id="benefits"
                            label="Benefits"
                            name="benefits"
                            description="A detailed description of the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        <InputPair
                            id="skills"
                            label="Skills"
                            name="skills"
                            description="The skills required for the position"
                            maxLength={1000}
                            placeholder="We are looking for a software engineer with 3 years of experience in React and Node.js"
                            required
                        />
                        <InputPair
                            id="companyName"
                            label="Company Name"
                            name="companyName"
                            description="The name of the company hiring for the position"
                            placeholder="Google"
                            required
                        />
                        <InputPair
                            id="companyLogoUrl"
                            label="Company Logo URL"
                            name="companyLogoUrl"
                            description="The URL of the company logo"
                            placeholder="https://example.com/logo.png"
                            required
                        />
                        <InputPair
                            id="companyLocation"
                            label="Company Location"
                            name="companyLocation"
                            description="The location of the company"
                            placeholder="San Francisco, CA"
                        />
                        <InputPair
                            id="companyWebsiteUrl"
                            label="Company Website URL"
                            name="companyWebsiteUrl"
                            description="The URL of the company website"
                            placeholder="https://example.com"
                        />
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
                        <SelectPair
                            id="location"
                            label="Location"
                            name="location"
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
                    </div>
                    <div className="flex justify-center">
                        <Button type="submit" className="w-1/2">post job for free</Button>
                    </div>
                </div>
            </Form>
        </div>
    );
} 