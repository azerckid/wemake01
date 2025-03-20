BEGIN;

-- Seed data for team
INSERT INTO team (team_id, product_name, team_size, equity_split, product_stage, roles, product_description, created_at, updated_at) 
OVERRIDING SYSTEM VALUE VALUES
(1, 'Frontend Development Platform', 5, 20, 'mvp', 'Frontend Developer, UI/UX Designer', 'A platform for building beautiful user interfaces', NOW(), NOW()),
(2, 'Backend API Service', 4, 25, 'prototype', 'Backend Developer, DevOps Engineer', 'Scalable backend service for modern applications', NOW(), NOW()),
(3, 'Design System Library', 3, 30, 'product', 'UI/UX Designer, Frontend Developer', 'Comprehensive design system for consistent UIs', NOW(), NOW()),
(4, 'DevOps Automation Tool', 4, 25, 'idea', 'DevOps Engineer, Backend Developer', 'Automation tool for infrastructure management', NOW(), NOW()),
(5, 'Product Analytics Platform', 5, 20, 'mvp', 'Product Manager, Data Analyst', 'Analytics platform for product insights', NOW(), NOW());

-- Seed data for follows (bridge table with composite primary key)
INSERT INTO follows (follower_id, following_id) VALUES
('a070a94d-d591-44f3-aea1-f6c45129df38', 'a070a94d-d591-44f3-aea1-f6c45129df38');

COMMIT; 