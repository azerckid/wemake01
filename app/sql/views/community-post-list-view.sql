DROP VIEW IF EXISTS community_post_list_view;

CREATE VIEW community_post_list_view AS
 SELECT
   posts.post_id,
   posts.title,
   posts.created_at,
   topics.name AS topic,
   topics.slug AS topic_slug,
   profiles.name AS author,
   profiles.avatar_url AS authorAvatarUrl,
   profiles.username AS author_username,
   (SELECT EXISTS (SELECT 1 FROM public.post_upvotes WHERE post_upvotes.post_id = posts.post_id AND post_upvotes.profile_id = auth.uid())) AS is_upvoted,
   COUNT(post_upvotes.post_id) AS upvotes
 FROM posts
 INNER JOIN topics USING (topic_id)
 INNER JOIN profiles USING (profile_id)
 LEFT JOIN post_upvotes USING (post_id)
 GROUP BY posts.post_id, topics.name, topics.slug, profiles.name, profiles.avatar_url, profiles.username;

SELECT * FROM community_post_list_view;