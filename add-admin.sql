-- Add admin user with hashed password (bcrypt hash for 'Dishu@1997')
INSERT INTO "User" (
  id, 
  name, 
  email, 
  password, 
  role, 
  "onboardingComplete", 
  "preferredLanguage", 
  "createdAt", 
  "updatedAt"
) 
VALUES (
  'cuid_admin_user', 
  'Dishant Parihar', 
  'dishantparihar00@gmail.com', 
  '$2a$10$XHk5JkZQDCFXF9XRjxvC7.dw8WPB.vqrEJVE9YB5OoLPRoKLZHZS2', -- bcrypt hash for 'Dishu@1997'
  'ADMIN', 
  true, 
  'en', 
  CURRENT_TIMESTAMP, 
  CURRENT_TIMESTAMP
)
ON CONFLICT (email) 
DO UPDATE SET 
  name = 'Dishant Parihar',
  password = '$2a$10$XHk5JkZQDCFXF9XRjxvC7.dw8WPB.vqrEJVE9YB5OoLPRoKLZHZS2',
  role = 'ADMIN',
  "onboardingComplete" = true,
  "preferredLanguage" = 'en',
  "updatedAt" = CURRENT_TIMESTAMP;
