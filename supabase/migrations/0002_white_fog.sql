/*
  # Seed Amenities Data
  
  1. Inserts default amenities into property_amenities table
  2. Categories:
    - Unit Features
    - Community Features
    - Security Features
    - Utilities
*/

INSERT INTO property_amenities (name, category) VALUES
-- Unit Features
('High Speed Internet', 'Unit Features'),
('Air Conditioning', 'Unit Features'),
('Washer/Dryer', 'Unit Features'),
('Dishwasher', 'Unit Features'),
('Microwave', 'Unit Features'),
('Hardwood Floors', 'Unit Features'),
('Walk-in Closet', 'Unit Features'),
('Balcony', 'Unit Features'),
('Patio', 'Unit Features'),

-- Community Features
('Swimming Pool', 'Community Features'),
('Fitness Center', 'Community Features'),
('Business Center', 'Community Features'),
('Clubhouse', 'Community Features'),
('BBQ/Picnic Area', 'Community Features'),
('Package Service', 'Community Features'),
('Parking Garage', 'Community Features'),
('Bike Storage', 'Community Features'),

-- Security Features
('Controlled Access', 'Security Features'),
('Security System', 'Security Features'),
('Video Surveillance', 'Security Features'),
('On-site Security', 'Security Features'),

-- Utilities
('Water Included', 'Utilities'),
('Gas Included', 'Utilities'),
('Electricity Included', 'Utilities'),
('Trash Included', 'Utilities'),
('Cable Ready', 'Utilities'),
('Internet Included', 'Utilities')
ON CONFLICT (name) DO NOTHING;