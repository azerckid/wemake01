import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/supa-client";

export const getJobs = async (
    client: SupabaseClient<Database>,
    {
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
     responsibilities,
     qualifications,
     benefits,
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

/**
 * 특정 job의 상세 정보를 조회합니다.
 * 
 * 변경 기록:
 * - 2024-04-10: company:companies 관계 조회 제거 (테이블에 해당 컬럼이 없음)
 * - 2024-04-10: jobs 테이블의 실제 컬럼들로 수정 (overview, company_name 등)
 */
export const getJobById = async (
    client: SupabaseClient<Database>,
    { jobId }: { jobId: number }
) => {
    const { data, error } = await client
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
         responsibilities,
         qualifications,
         benefits,
         created_at
         `
        )
        .eq("job_id", jobId)
        .maybeSingle();
    if (error) {
        throw error;
    }
    return data;
};