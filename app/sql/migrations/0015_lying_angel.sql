DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum e
        JOIN pg_type t ON e.enumtypid = t.oid
        WHERE t.typname = 'event_type' AND e.enumlabel = 'product_like'
    ) THEN
        ALTER TYPE "public"."event_type" ADD VALUE 'product_like';
    END IF;
END $$;