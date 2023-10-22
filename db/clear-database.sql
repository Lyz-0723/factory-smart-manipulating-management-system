/* !! This script will delete all datas in database and set the auto increment to 1. */

USE fsmms;

DELETE FROM Users;
DELETE FROM Items;
DELETE FROM Production_Lines;
DELETE FROM Production_Line_Records;
DELETE FROM Machines;
DELETE FROM Orders;
DELETE FROM Environment;

ALTER TABLE Users AUTO_INCREMENT = 1;
ALTER TABLE Items AUTO_INCREMENT = 1;
ALTER TABLE Production_Lines AUTO_INCREMENT = 1;
ALTER TABLE Production_Line_Records AUTO_INCREMENT = 1;
ALTER TABLE Machines AUTO_INCREMENT = 1;
ALTER TABLE Orders AUTO_INCREMENT = 1;
ALTER TABLE Environment AUTO_INCREMENT = 1;