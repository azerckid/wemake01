BEGIN;

-- Seed data for categories
INSERT INTO categories (category_id, name, description, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'AI & Machine Learning', 'Products and tools related to artificial intelligence and machine learning', NOW(), NOW()),
(2, 'Developer Tools', 'Tools and utilities for software developers', NOW(), NOW()),
(3, 'Design Tools', 'Tools for designers and creative professionals', NOW(), NOW()),
(4, 'Productivity', 'Tools to improve productivity and workflow', NOW(), NOW()),
(5, 'Communication', 'Tools for team and personal communication', NOW(), NOW());

-- Seed data for jobs
INSERT INTO jobs (job_id, title, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo_url, company_location, company_website_url, job_type, location_type, salary_range, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'Senior Full Stack Developer', 'Looking for an experienced developer to join our team', 'Lead development of new features, mentor junior developers', '5+ years experience, React, Node.js', 'Competitive salary, health insurance', 'React, Node.js, TypeScript', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco', 'https://techcorp.com', 'full-time', 'hybrid', '150k-200k', NOW(), NOW()),
(2, 'Frontend Developer', 'Join our frontend team to build beautiful UIs', 'Build responsive web applications', '3+ years experience, React', 'Remote work, flexible hours', 'React, TypeScript, CSS', 'WebDev Inc', 'https://example.com/logo2.png', 'Remote', 'https://webdev.com', 'full-time', 'remote', '100k-150k', NOW(), NOW()),
(3, 'Backend Developer', 'Help us build scalable backend systems', 'Design and implement APIs', '4+ years experience, Node.js', '401k, dental insurance', 'Node.js, PostgreSQL, AWS', 'BackendPro', 'https://example.com/logo3.png', 'New York', 'https://backendpro.com', 'full-time', 'on-site', '100k-150k', NOW(), NOW()),
(4, 'DevOps Engineer', 'Join our infrastructure team', 'Manage cloud infrastructure', '3+ years experience, AWS', 'Stock options, gym membership', 'AWS, Docker, Kubernetes', 'CloudTech', 'https://example.com/logo4.png', 'Seattle', 'https://cloudtech.com', 'full-time', 'hybrid', '150k-200k', NOW(), NOW()),
(5, 'UI/UX Designer', 'Create beautiful user experiences', 'Design user interfaces and flows', '3+ years experience, Figma', 'Health insurance, 401k', 'Figma, Adobe XD, User Research', 'DesignCo', 'https://example.com/logo5.png', 'Los Angeles', 'https://designco.com', 'full-time', 'on-site', '50k-100k', NOW(), NOW());

-- Seed data for product
INSERT INTO product (product_id, name, tagline, description, price, how_it_works, icon, url, stats, profile_id, category_id, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'AI Code Assistant', 'Your AI pair programmer', 'An AI-powered code completion tool', 29, 'Installs as a VS Code extension', '🤖', 'https://aicode.com', '{"views":1000,"review":4.5}', 'a070a94d-d591-44f3-aea1-f6c45129df38', 1, NOW(), NOW()),
(2, 'Design System Kit', 'Build consistent UIs faster', 'A comprehensive design system kit', 49, 'Download and import into Figma', '🎨', 'https://designkit.com', '{"views":800,"review":4.8}', 'a070a94d-d591-44f3-aea1-f6c45129df38', 3, NOW(), NOW()),
(3, 'Task Manager Pro', 'Organize your work', 'A powerful task management tool', 19, 'Sign up and start organizing', '✓', 'https://taskpro.com', '{"views":1200,"review":4.2}', 'a070a94d-d591-44f3-aea1-f6c45129df38', 4, NOW(), NOW()),
(4, 'Team Chat App', 'Better team communication', 'A modern team chat application', 39, 'Create a workspace and invite team', '💬', 'https://teamchat.com', '{"views":900,"review":4.6}', 'a070a94d-d591-44f3-aea1-f6c45129df38', 5, NOW(), NOW()),
(5, 'Code Review Tool', 'Streamline code reviews', 'Automated code review platform', 59, 'Connect your GitHub repository', '👀', 'https://codereview.com', '{"views":700,"review":4.7}', 'a070a94d-d591-44f3-aea1-f6c45129df38', 2, NOW(), NOW());

-- Seed data for product_upvotes (bridge table with composite primary key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, 'a070a94d-d591-44f3-aea1-f6c45129df38');

-- Seed data for reviews
INSERT INTO reviews (review_id, product_id, profile_id, review, rating, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 1, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Great tool for improving productivity!', 5, NOW(), NOW()),
(2, 2, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Very comprehensive design system.', 4, NOW(), NOW()),
(3, 3, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Simple but effective task management.', 5, NOW(), NOW()),
(4, 4, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Perfect for our team communication.', 4, NOW(), NOW()),
(5, 5, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Makes code reviews much easier.', 5, NOW(), NOW());

-- Seed data for gpt_ideas
INSERT INTO gpt_ideas (gpt_idea_id, idea, views, claimed_at, claimed_by, created_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'AI-powered code review assistant', 150, NOW(), 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW()),
(2, 'Smart task prioritization tool', 120, NULL, NULL, NOW()),
(3, 'Automated UI testing platform', 180, NOW(), 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW()),
(4, 'Team collaboration dashboard', 90, NULL, NULL, NOW()),
(5, 'Code documentation generator', 200, NOW(), 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW());

-- Seed data for gpt_ideas_likes (bridge table with composite primary key)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, 'a070a94d-d591-44f3-aea1-f6c45129df38');

-- Seed data for topics
INSERT INTO topics (topic_id, name, slug, created_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'Programming', 'programming', NOW()),
(2, 'Design', 'design', NOW()),
(3, 'Productivity', 'productivity', NOW()),
(4, 'AI & ML', 'ai-ml', NOW()),
(5, 'Career', 'career', NOW());

-- Seed data for posts
INSERT INTO posts (post_id, title, content, topic_id, profile_id, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'Getting Started with React', 'Learn the basics of React development...', 1, 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW(), NOW()),
(2, 'UI Design Principles', 'Essential principles for creating great UIs...', 2, 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW(), NOW()),
(3, 'Time Management Tips', 'How to be more productive...', 3, 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW(), NOW()),
(4, 'Introduction to Machine Learning', 'A beginner guide to ML...', 4, 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW(), NOW()),
(5, 'Career Growth in Tech', 'Tips for advancing your tech career...', 5, 'a070a94d-d591-44f3-aea1-f6c45129df38', NOW(), NOW());

-- Seed data for post_replies (bridge table with composite primary key)
INSERT INTO post_replies (post_id, parent_id, profile_id, reply, created_at, updated_at) VALUES
(1, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Great article! Very helpful.', NOW(), NOW()),
(2, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'These principles are essential.', NOW(), NOW()),
(3, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Thanks for sharing these tips!', NOW(), NOW()),
(4, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'This is a great introduction.', NOW(), NOW()),
(5, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Very insightful post!', NOW(), NOW());

-- Seed data for post_upvotes (bridge table with composite primary key)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, 'a070a94d-d591-44f3-aea1-f6c45129df38');

-- Seed data for message_rooms
INSERT INTO message_rooms (message_room_id, created_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, NOW()),
(2, NOW()),
(3, NOW()),
(4, NOW()),
(5, NOW());

-- Seed data for message_room_members (bridge table with composite primary key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, 'a070a94d-d591-44f3-aea1-f6c45129df38');

-- Seed data for messages
INSERT INTO messages (message_id, message_room_id, sender_id, content, created_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 1, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Hello!', NOW()),
(2, 2, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'How are you?', NOW()),
(3, 3, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Great to meet you!', NOW()),
(4, 4, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Thanks for connecting!', NOW()),
(5, 5, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'Looking forward to working together!', NOW());

-- Seed data for notifications
INSERT INTO notifications (notification_id, source_id, product_id, post_id, target_id, type, created_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'a070a94d-d591-44f3-aea1-f6c45129df38', 1, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'review', NOW()),
(2, 'a070a94d-d591-44f3-aea1-f6c45129df38', NULL, 1, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'reply', NOW()),
(3, 'a070a94d-d591-44f3-aea1-f6c45129df38', NULL, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'follow', NOW()),
(4, 'a070a94d-d591-44f3-aea1-f6c45129df38', 2, NULL, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'review', NOW()),
(5, 'a070a94d-d591-44f3-aea1-f6c45129df38', NULL, 2, 'a070a94d-d591-44f3-aea1-f6c45129df38', 'reply', NOW());

COMMIT; 