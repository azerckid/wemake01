import { pgTable, bigint, text, integer, timestamp, jsonb, uuid, primaryKey, check, foreignKey } from "drizzle-orm/pg-core";
import { profiles } from "../users/schema";
import { sql } from "drizzle-orm";

export const product = pgTable(
    "product",
    {
        product_id: bigint({ mode: "number" })
            .primaryKey()
            .generatedAlwaysAsIdentity(),
        name: text().notNull(),
        tagline: text().notNull(),
        description: text().notNull(),
        how_it_works: text().notNull(),
        icon: text().notNull(),
        url: text().notNull(),
        stats: jsonb().notNull().default({ views: 0, reviews: 0, upvotes: 0 }),
        profile_id: uuid().notNull(),
        category_id: bigint({ mode: "number" }).references(
            () => categories.category_id,
            { onDelete: "set null" }
        ),
        created_at: timestamp().notNull().defaultNow(),
        updated_at: timestamp().notNull().defaultNow(),
    },
    (table) => [
        foreignKey({
            columns: [table.profile_id],
            foreignColumns: [profiles.profile_id],
            name: "product_to_profiles",
        }).onDelete("cascade"),
    ]
);

export const categories = pgTable("categories", {
    category_id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity(),
    name: text().notNull(),
    description: text().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const product_upvotes = pgTable("product_upvotes", {
    product_id: bigint({ mode: "number" })
        .references(() => product.product_id, { onDelete: "cascade" }),
    profile_id: uuid()
        .references(() => profiles.profile_id, { onDelete: "cascade" }),

}, (table) => [primaryKey({ columns: [table.product_id, table.profile_id] })]
);

export const reviews = pgTable("reviews", {
    review_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedByDefaultAsIdentity(),
    product_id: bigint({ mode: "number" })
        .references(() => product.product_id, { onDelete: "cascade" }),
    profile_id: uuid()
        .references(() => profiles.profile_id, { onDelete: "cascade" }),
    review: text().notNull(),
    rating: integer().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, (table) => [check("rating_check", sql`${table.rating} between 1 and 5`)],
);
