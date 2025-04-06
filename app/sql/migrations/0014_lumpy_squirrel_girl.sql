DROP FUNCTION IF EXISTS "public"."track_event"(event_type, jsonb);--> statement-breakpoint
ALTER TABLE "public"."events" ALTER COLUMN "event_type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."event_type";--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('product_view', 'product_visit', 'profile_view');--> statement-breakpoint
ALTER TABLE "public"."events" ALTER COLUMN "event_type" SET DATA TYPE "public"."event_type" USING "event_type"::"public"."event_type";--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."track_event"(
    event_type event_type, 
    event_data jsonb
) RETURNS void AS $$
BEGIN
    INSERT INTO events (event_type, event_data) VALUES (event_type, event_data);
END;
$$ LANGUAGE plpgsql;