-- DROP DATABASE IF EXISTS SDC;

-- CREATE DATABASE SDC;

-- USE SDC;

-- CREATE TABLE questions (
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     product_id int NOT NULL,
--     body VARCHAR(255) NOT NULL,
--     date_written int,
--     asker_name VARCHAR(40) NOT NULL,
--     asker_email VARCHAR(60) NOT NULL,
--     reported int DEFAULT 0,
--     helpful int DEFAULT 0,
--     INDEX (id)
-- );

-- CREATE TABLE answers (
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     question_id int NOT NULL,
--     body VARCHAR(255) NOT NULL,
--     date_written int,
--     answerer_name VARCHAR(40) NOT NULL,
--     answerer_email VARCHAR(60) NOT NULL,
--     reported int DEFAULT 0,
--     helpful int DEFAULT 0,
--     INDEX (id),
--     CONSTRAINT questionID
--     FOREIGN KEY (question_id)
--     REFERENCES questions(id)
-- );

-- CREATE TABLE photos (
--     id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     answer_id int NOT NULL,
--     url VARCHAR(255) NOT NULL,
--     INDEX (id),
--     CONSTRAINT answerID
--     FOREIGN KEY (answer_id)
--     REFERENCES answers(id)
-- );

-- LOAD DATA LOCAL INFILE '/Users/marcanthony/Desktop/HR/database-pyrenees/questions/answers_photos.csv'
-- INTO TABLE photos
-- FIELDS TERMINATED BY ',' 
-- ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS;

