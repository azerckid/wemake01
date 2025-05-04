import { pgSchema, pgTable, text, timestamp, uuid, pgEnum, jsonb, unique, primaryKey, bigint, boolean } from "drizzle-orm/pg-core";
import { product } from "../products/schema";
import { posts } from "../community/schema";

const authSchema = pgSchema("auth");
const users = authSchema.table("users", {
    id: uuid().primaryKey(),
});

export const roles = pgEnum("roles", ["developer", "designer", "product-manager", "founder", "other"]);

export const profiles = pgTable("profiles", {
    profile_id: uuid().primaryKey().references(() => users.id, { onDelete: "cascade" }),
    name: text().notNull(),
    username: text().notNull(),
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


export const notificationType = pgEnum("notification_type", [
    "follow",
    "review",
    "reply",
    "mention",
]);

export const notifications = pgTable("notifications", {
    notification_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    source_id: uuid().references(() => profiles.profile_id, {
        onDelete: "cascade",
    }),
    product_id: bigint({ mode: "number" }).references(() => product.product_id, {
        onDelete: "cascade",
    }),
    post_id: bigint({ mode: "number" }).references(() => posts.post_id, {
        onDelete: "cascade",
    }),
    target_id: uuid()
        .references(() => profiles.profile_id, {
            onDelete: "cascade",
        })
        .notNull(),
    seen: boolean().default(false).notNull(),
    type: notificationType().notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRooms = pgTable("message_rooms", {
    message_room_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    created_at: timestamp().notNull().defaultNow(),
});

export const messageRoomMembers = pgTable(
    "message_room_members",
    {
        message_room_id: bigint({ mode: "number" }).references(
            () => messageRooms.message_room_id,
            {
                onDelete: "cascade",
            }
        ),
        profile_id: uuid().references(() => profiles.profile_id, {
            onDelete: "cascade",
        }),
        created_at: timestamp().notNull().defaultNow(),
    },
    (table) => [
        primaryKey({ columns: [table.message_room_id, table.profile_id] }),
    ]
);

export const messages = pgTable("messages", {
    message_id: bigint({ mode: "number" })
        .primaryKey()
        .generatedAlwaysAsIdentity(),
    message_room_id: bigint({ mode: "number" }).references(
        () => messageRooms.message_room_id,
        {
            onDelete: "cascade",
        }
    ).notNull(),
    sender_id: uuid().references(() => profiles.profile_id, {
        onDelete: "cascade",
    }).notNull(),
    content: text().notNull(),
    created_at: timestamp().notNull().defaultNow(),
});

