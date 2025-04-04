import client from "~/supa-client";

export const getJobs = async ({
    limit,
    location,
    type,
    salary,
}: {
    limit: number;
    location?: string;
    type?: string;
    salary?: string;
}) => {
    const baseQuery = client
        .from("jobs")
        .select(
            `
     job_id,
     title,
     overview,
     company_name,
     company_logo_url,
     company_location,
     job_type,
     location_type,
     salary_range,
     created_at
     `
        )
        .limit(limit);
    if (location) {
        baseQuery.eq("location_type", location as "remote" | "on-site" | "hybrid" | "other");
    }
    if (type) {
        baseQuery.eq("job_type", type as any);
    }
    if (salary) {
        baseQuery.eq("salary_range", salary as any);
    }
    const { data, error } = await baseQuery;
    if (error) {
        throw error;
    }
    return data;
};

export const getJobById = async (jobId: string) => {
    const { data, error } = await client
        .from("jobs")
        .select("*")
        .eq("job_id", parseInt(jobId))
        .single();
    if (error) throw error;
    return data;
};