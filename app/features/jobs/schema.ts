import { pgTable, bigint, text, timestamp, varchar, integer, boolean, pgEnum } from "drizzle-orm/pg-core";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGES } from "./constants";

export const jobType = pgEnum("job_type", JOB_TYPES.map((jobType) => jobType.value) as [string, ...string[]]);
export const locationType = pgEnum("location_type", LOCATION_TYPES.map((locationType) => locationType.value) as [string, ...string[]]);
export const salaryRange = pgEnum("salary_range", SALARY_RANGES.map((salaryRange) => salaryRange.value) as [string, ...string[]]);

export const jobs = pgTable("jobs", {
    job_id: bigint("job_id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    title: text("title").notNull(),
    overview: text("overview").notNull(),
    responsibilities: text("responsibilities").notNull(),
    qualifications: text("qualifications").notNull(),
    benefits: text("benefits").notNull(),
    skills: text("skills").notNull(),
    company_name: text("company_name").notNull(),
    company_logo_url: text("company_logo_url"),
    company_location: text("company_location").notNull(),
    company_website_url: text("company_website_url"),
    job_type: jobType("job_type").notNull(),
    location_type: locationType("location_type").notNull(),
    salary_range: salaryRange("salary_range").notNull(),
    // salary_min: integer("salary_min").notNull(),
    // salary_max: integer("salary_max").notNull(),
    // salary_currency: text("salary_currency").notNull(),
    is_active: boolean("is_active").default(true).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});
