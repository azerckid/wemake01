import { z } from "zod";
import type { Database } from "~/supa-client";
import { formSchema } from "./pages/submit-job-page";
import type { SupabaseClient } from '@supabase/supabase-js';

export const createJob = async (
    client: SupabaseClient<Database>,
    data: z.infer<typeof formSchema>
) => {
    const jobData = {
        title: data.position,
        overview: data.overview,
        responsibilities: data.responsibilities,
        qualifications: data.qualifications,
        benefits: data.benefits,
        skills: data.skills,
        company_name: data.companyName,
        company_logo_url: data.companyLogoUrl,
        company_location: data.companyLocation,
        company_website_url: data.applyUrl,
        job_type: data.jobType,
        location_type: data.jobLocation,
        salary_range: data.salaryRange,
        is_active: true,
    };

    const { data: result, error } = await client
        .from("jobs")
        .insert(jobData as any)
        .select()
        .single();
    if (error) {
        throw error;
    }
    return result;
};