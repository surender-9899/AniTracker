-- Sample Anime Data for Testing
-- Run this script in your SQL Server database to populate with sample anime

-- Clear existing data (optional)
-- DELETE FROM watchlist;
-- DELETE FROM anime;

-- Insert sample anime
INSERT INTO anime (title, genre, total_episodes, total_seasons, type, status, start_date, username) VALUES
('Naruto', 'Action', 220, 1, 'Series', 'Completed', '2002-10-03', 'admin'),
('Attack on Titan', 'Action', 25, 1, 'Series', 'Completed', '2013-04-07', 'admin'),
('Death Note', 'Thriller', 37, 1, 'Series', 'Completed', '2006-10-04', 'admin'),
('One Piece', 'Adventure', 1000, 1, 'Series', 'Airing', '1999-10-20', 'admin'),
('Demon Slayer', 'Action', 26, 1, 'Series', 'Completed', '2019-04-06', 'admin'),
('My Hero Academia', 'Action', 25, 1, 'Series', 'Completed', '2016-04-03', 'admin'),
('Fullmetal Alchemist: Brotherhood', 'Action', 64, 1, 'Series', 'Completed', '2009-04-05', 'admin'),
('Steins;Gate', 'Sci-Fi', 24, 1, 'Series', 'Completed', '2011-04-06', 'admin'),
('Hunter x Hunter', 'Adventure', 148, 1, 'Series', 'Completed', '2011-10-02', 'admin'),
('Code Geass', 'Mecha', 25, 1, 'Series', 'Completed', '2006-10-06', 'admin'),
('Spirited Away', 'Fantasy', 1, 1, 'Movie', 'Completed', '2001-07-20', 'admin'),
('Your Name', 'Romance', 1, 1, 'Movie', 'Completed', '2016-08-26', 'admin'),
('A Silent Voice', 'Drama', 1, 1, 'Movie', 'Completed', '2016-09-17', 'admin'),
('Jujutsu Kaisen', 'Action', 24, 1, 'Series', 'Completed', '2020-10-03', 'admin'),
('The Promised Neverland', 'Thriller', 12, 1, 'Series', 'Completed', '2019-01-11', 'admin'),
('Made in Abyss', 'Adventure', 13, 1, 'Series', 'Completed', '2017-07-07', 'admin'),
('Re:Zero', 'Fantasy', 25, 1, 'Series', 'Completed', '2016-04-04', 'admin'),
('Konosuba', 'Comedy', 20, 2, 'Series', 'Completed', '2016-01-14', 'admin'),
('Overlord', 'Fantasy', 39, 3, 'Series', 'Completed', '2015-07-07', 'admin'),
('No Game No Life', 'Fantasy', 12, 1, 'Series', 'Completed', '2014-04-09', 'admin');

-- Note: You may need to adjust the table structure if your database schema is different
-- Make sure to run this after your application has created the tables
