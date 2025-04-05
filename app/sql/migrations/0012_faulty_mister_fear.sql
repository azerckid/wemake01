ALTER TABLE "product" DROP CONSTRAINT "product_profile_id_profiles_profile_id_fk";
--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "product_id" SET GENERATED ALWAYS;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "stats" SET DEFAULT '{"views":0,"reviews":0,"upvotes":0}'::jsonb;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "updated_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_to_profiles" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("profile_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" DROP COLUMN "price";