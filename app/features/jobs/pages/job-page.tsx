import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";
import type { Route } from "./+types/job-page";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
    return [{
        title: "Job Details",
    }]
}

export default function JobPage() {
    return (
        <div>
            <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
            <div className="grid grid-cols-6 gap-20 items-start -mt-20">
                <div className="col-span-4 space-y-10">
                    <div className="flex flex-col gap-2">
                        <div className="rounded-full border-2 border-white size-40 relative left-10 bg-white overflow-hidden">
                            <img src="https://github.com/apple.png" alt="apple"
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-4xl font-bold">Software Engineer</h1>
                        <p className="text-sm text-muted-foreground">Apple</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge className="bg-primary text-white">Full-time</Badge>
                        <Badge className="bg-primary text-white">Remote</Badge>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Overview</h4>
                        <p className="text-lg text-muted-foreground">
                            We are looking for a software engineer with a passion for building products that help people live better lives.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Responsibilities</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {[
                                "Develop and maintain software applications",
                                "Collaborate with cross-functional teams to define, design, and ship new features",
                                "Implement solutions to complex problems",
                                "Integrate data storage solutions",
                                "Design and implement low-latency, high-availability, and scalable systems",
                                "Ensure the technical feasibility of UI/UX designs",
                                "Optimize application performance",
                                "Collaborate with other teams to improve usability",
                                "Write code that is clean and easy to understand",
                            ].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Qualifications</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {[
                                "Bachelor's degree in Computer Science or related field",
                                "3+ years of experience in software development",
                                "Strong proficiency in JavaScript, TypeScript, and React",
                                "Experience with Node.js and Express",
                                "Familiarity with RESTful APIs to connect mobile applications to back-end services",
                                "Experience with cloud-based solutions (AWS, Azure, etc.)",
                                "Experience with Docker and Kubernetes",
                                "Experience with CI/CD pipelines",
                                "Experience with Agile methodologies",
                                "Experience with Git and GitHub",

                            ].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Benefits</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {[
                                "Healthcare benefits",
                                "Dental benefits",
                                "Vision benefits",
                                "401(k) plan",
                                "Flexible working hours",
                                "Remote work options",
                                "Employee discounts",
                                "Team building activities",
                                "Employee referral program",
                                "Employee assistance program",
                                "Employee discount program",
                                "Employee stock purchase plan",
                                "Experience with CI/CD pipelines",
                                "Experience with Agile methodologies",
                                "Experience with Git and GitHub",

                            ].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-2xl font-bold">Skills</h4>
                        <ul className="list-disc list-inside text-lg text-muted-foreground">
                            {[
                                "JavaScript",
                                "TypeScript",
                                "React",
                                "Node.js",
                                "Express",
                                "AWS",
                                "Azure",
                                "Docker",
                                "Kubernetes",
                                "CI/CD pipelines",
                                "Agile methodologies",
                                "Git and GitHub",
                            ].map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2 space-y-4 mt-20 sticky top-20 border rounded-lg p-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                            Salary: $100,000 - $120,000
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Avg. Salary: $110,000
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">
                            Location: Remote
                        </span>
                        <span className="text-sm text-muted-foreground">
                            Type: Full-time
                        </span>
                    </div>
                    <div className="flex">
                        <span className="text-sm text-muted-foreground">
                            Posted: 2 days ago
                        </span>
                        <DotIcon className="size-4" />
                        <span className="text-sm text-muted-foreground">
                            343 views
                        </span>
                    </div>
                    <Button className="w-full">Apply Now</Button>
                </div>
            </div>
        </div>
    );
} 