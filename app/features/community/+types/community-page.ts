import type { MetaFunction } from "react-router";

export namespace Route {
    export interface Topic {
        name: string;
        slug: string;
    }

    export interface Author {
        name: string;
        username: string;
        avatar_url: string | null;
    }

    export interface TopicData {
        name: string;
    }

    export interface Upvote {
        count: number;
    }

    export interface Post {
        post_id: number;
        title: string;
        created_at: string;
        topic: TopicData;
        author: Author;
        upvotes: Upvote[];
    }

    export interface LoaderData {
        topics: Topic[];
        posts: Post[];
    }

    export interface ComponentProps {
        loaderData: LoaderData;
    }
} 