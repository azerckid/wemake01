import { pgSchema, pgTable, text, timestamp, uuid, pgEnum, jsonb, unique, primaryKey } from "drizzle-orm/pg-core";

const authSchema = pgSchema("auth");
const users = authSchema.table("users", {
    id: uuid().primaryKey(),
});

export const roles = pgEnum("roles", ["developer", "designer", "product-manager", "founder", "other"]);

export const profiles = pgTable("profiles", {
    profile_id: uuid().primaryKey().references(() => users.id, { onDelete: "cascade" }),
    name: text().notNull(),
    role: roles().default("other").notNull(),
    headline: text(),
    bio: text(),
    avatar_url: text(),
    stats: jsonb().$type<{
        followers: number;
        following: number;
    }>(),
    views: jsonb(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

export const follows = pgTable("follows", {
    follower_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    following_id: uuid().references(() => profiles.profile_id, { onDelete: "cascade" }).notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
});

