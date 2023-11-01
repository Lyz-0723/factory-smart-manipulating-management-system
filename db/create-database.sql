/* !! This file will recreate the whole database and remove the existing one. Check twice before using it. */

-- Prevent recreating database
DROP DATABASE IF EXISTS fsmms;
DROP USER IF EXISTS 'fsmmsRoot'@'localhost';
DROP USER IF EXISTS 'fsmmsAdmin'@'%';

-- Setting configuration
SOURCE /tmp/fsmmsConfig.sql;

-- Create database
CREATE DATABASE fsmms;
USE fsmms;

-- Create root user
SET @create_user_sql = CONCAT('CREATE USER ''fsmmsRoot''@''localhost'' IDENTIFIED BY ''', @db_password, ''';');
PREPARE stmt FROM @create_user_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
GRANT ALL PRIVILEGES ON fsmms.* TO 'fsmmsRoot'@'localhost';

-- Create admin user
SET @create_user_sql = CONCAT('CREATE USER ''fsmmsAdmin''@''%'' IDENTIFIED BY ''', @db_password, ''';');
PREPARE stmt FROM @create_user_sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, EXECUTE, INDEX ON fsmms.* TO 'fsmmsAdmin'@'%';

-- Create USERS table
CREATE TABLE Users
(
    user_id      INT AUTO_INCREMENT PRIMARY KEY,
    user_name    VARCHAR(60) NOT NULL UNIQUE,
    password     VARCHAR(64) NOT NULL,
    company_info VARCHAR(90) NOT NULL,
    contact_info VARCHAR(90) NOT NULL,
    is_admin     BOOLEAN     NOT NULL
);

-- Create ITEMS table
CREATE TABLE Items
(
    item_id          INT AUTO_INCREMENT PRIMARY KEY,
    item_name        VARCHAR(50) NOT NULL,
    item_description VARCHAR(60),
    unit_price       INT         NOT NULL
);

-- Create PRODUCTION_LINE_STATUS table
CREATE TABLE Production_Line_Status
(
    status_id       INT PRIMARY KEY,
    status          VARCHAR(9) NOT NULL
);

-- Create PRODUCTION_LINES table
CREATE TABLE Production_Lines
(
    pl_id          INT AUTO_INCREMENT PRIMARY KEY,
    pl_name        VARCHAR(60) NOT NULL,
    pl_description VARCHAR(60),
    status         INT         NOT NULL,
    FOREIGN KEY (status) REFERENCES Production_Line_Status (status_id),
    item_id        INT         NOT NULL,
    FOREIGN KEY (item_id) REFERENCES Items (item_id)
);

-- Create PRODUCTION_LINE_RECORD_RATINGS table
CREATE TABLE Production_Line_Record_Ratings
(
    rating_id       INT PRIMARY KEY,
    rating          VARCHAR(9) NOT NULL
);

-- Create PRODUCTION_LINE_RECORDS table
CREATE TABLE Production_Line_Records
(
    pl_record_id       INT AUTO_INCREMENT PRIMARY KEY,
    rating             INT  NOT NULL,
    FOREIGN KEY (rating) REFERENCES Production_Line_Record_Ratings (rating_id),
    production_output  INT  NOT NULL,
    energy_consumption INT  NOT NULL,
    record_time        DATETIME NOT NULL,
    pl_id              INT  NOT NULL,
    FOREIGN KEY (pl_id) REFERENCES Production_Lines (pl_id)
);

-- Create MACHINE_STATUS table
CREATE TABLE Machine_Status
(
    status_id       INT PRIMARY KEY,
    status          VARCHAR(9) NOT NULL
);

-- Create MACHINES table
CREATE TABLE Machines
(
    machine_id    INT AUTO_INCREMENT PRIMARY KEY,
    serial_number VARCHAR(30) NOT NULL,
    machine_usage VARCHAR(30) NOT NULL,
    position      INT         NOT NULL,
    status        INT         NOT NULL,
    FOREIGN KEY (status) REFERENCES Machine_Status (status_id),
    script        VARCHAR(120),
    pl_id         INT         NOT NULL,
    FOREIGN KEY (pl_id) REFERENCES Production_Lines (pl_id)
);

-- Create ORDER_STATUS table
CREATE TABLE Order_Status
(
    status_id       INT PRIMARY KEY,
    status          VARCHAR(9) NOT NULL
);

-- Create ORDERS table
CREATE TABLE Orders
(
    order_id          INT AUTO_INCREMENT PRIMARY KEY,
    total_amount      INT         NOT NULL,
    status            INT         NOT NULL,
    FOREIGN KEY (status) REFERENCES Order_Status (status_id),
    create_date       DATE        NOT NULL,
    payment_method    VARCHAR(30) NOT NULL,
    pay_date          DATE        NOT NULL,
    customize_details VARCHAR(60),
    ordered_user_id   INT         NOT NULL,
    FOREIGN KEY (ordered_user_id) REFERENCES Users (user_id),
    ordered_item_id   INT         NOT NULL,
    FOREIGN KEY (ordered_item_id) REFERENCES Items (item_id)
);

-- Create ENVIRONMENT table
CREATE TABLE Environment
(
    env_record_id          INT AUTO_INCREMENT PRIMARY KEY,
    temperature            FLOAT NOT NULL,
    humidity               FLOAT NOT NULL,
    pressure               FLOAT NOT NULL,
    vibration              FLOAT NOT NULL,
    chemical_concentration FLOAT NOT NULL,
    noise                  INT   NOT NULL,
    record_time            DATETIME NOT NULL
);


INSERT INTO Production_Line_Status (status_id, status) VALUES
(1, 'Available'),
(2, 'Busy');

INSERT INTO Production_Line_Record_Ratings (rating_id, rating) VALUES
(1, 'N / A'),
(2, 'Bad'),
(3, 'Good'),
(4, 'Excellent');

INSERT INTO Machine_Status (status_id, status) VALUES
(1, 'Stop'),
(2, 'Working'),
(3, 'Pending'),
(4, 'Down'),
(5, 'Fixing');

INSERT INTO Order_Status (status_id, status) VALUES
(1, 'Pending'),
(2, 'Producing'),
(3, 'Finished'),
(4, 'Archived');