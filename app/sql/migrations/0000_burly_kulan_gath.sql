CREATE TYPE "public"."job_type" AS ENUM('full-time', 'part-time', 'contract', 'freelance', 'internship', 'temporary', 'volunteer', 'other');--> statement-breakpoint
CREATE TYPE "public"."location_type" AS ENUM('remote', 'on-site', 'hybrid', 'other');--> statement-breakpoint
CREATE TYPE "public"."salary_range" AS ENUM('less-than-50k', '50k-100k', '100k-150k', '150k-200k', 'more-than-200k', 'other');--> statement-breakpoint
CREATE TABLE "jobs" (
	"job_id" bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "jobs_job_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"overview" text NOT NULL,
	"responsibilities" text NOT NULL,
	"qualifications" text NOT NULL,
	"benefits" text NOT NULL,
	"skills" text NOT NULL,
	"company_name" text NOT NULL,
	"company_logo_url" text,
	"company_location" text NOT NULL,
	"company_website_url" text,
	"job_type" "job_type" NOT NULL,
	"location_type" "location_type" NOT NULL,
	"salary_range" "salary_range" NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
