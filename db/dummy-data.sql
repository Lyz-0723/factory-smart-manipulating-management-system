/* !! This script will generate dummy datas for all tables. */

-- Users table
INSERT INTO Users (user_name, password, company_info, contact_info, is_admin) VALUES
('admin', 'password1', 'Company A', '0900000000:companyA@gmail.com', 1),
('user2', 'password2', 'Company B', '0900000001:', 0),
('user3', 'password3', 'Company C', '0900000002:companyC@gmail.com', 0),
('user4', 'password4', 'Company D', '0900000003:companyD@gmail.com', 0),
('user5', 'password5', 'Company E', '0900000004:', 0);

-- Items table
INSERT INTO Items (item_name, item_description, unit_price) VALUES
('hat1', 'Description 1', 10),
('hat2', 'Description 2', 20),
('computer1', 'Description 3', 15),
('computer2', 'Description 4', 12),
('computer3', 'Description 5', 18);

-- Production_Lines table
INSERT INTO Production_Lines (pl_name, pl_description, status, item_id) VALUES
('Production Line 1', 'PL Description 1', 2, 1),
('Production Line 2', 'PL Description 2', 1, 2),
('Production Line 3', 'PL Description 3', 1, 3),
('Production Line 4', 'PL Description 4', 1, 4),
('Production Line 5', 'PL Description 5', 2, 5);

-- Production_Line_Records table
INSERT INTO Production_Line_Records (rating, production_output, energy_consumption, record_time, pl_id) VALUES
(2, 100, 50, '2023-10-15', 1),
(4, 90, 48, '2023-10-15', 2),
(3, 80, 45, '2023-10-15', 3),
(4, 85, 47, '2023-10-15', 4),
(4, 95, 50, '2023-10-15', 5);

-- Machines table
INSERT INTO Machines (serial_number, machine_usage, position, status, script, pl_id) VALUES
('SN1', 'Usage 1', 1, 1, 'Script 1...', 1),
('SN2', 'Usage 2', 2, 2, 'Script 2...', 2),
('SN3', 'Usage 3', 3, 3, 'Script 3...', 3),
('SN4', 'Usage 4', 4, 4, 'Script 4...', 4),
('SN5', 'Usage 5', 5, 5, 'Script 5...', 5);

-- Orders table
INSERT INTO Orders (total_amount, status, create_date, payment_method, pay_date, customize_details, ordered_user_id, ordered_item_id) VALUES
(100, 2, '2023-10-15', 'Debit Card', '2023-10-16 00:00:00', 'red:CB', 2, 1),
(150, 2, '2023-10-15', 'Credit Card', '2023-10-16 03:00:00', 'black:CB', 2, 2),
(120, 2, '2023-10-15', 'Credit Card', '2023-10-16 06:00:00', 'black:', 3, 3),
(80, 1, '2023-10-15', 'Check', '2023-10-16 09:00:00', 'red:CD', 4, 4),
(200, 2, '2023-10-15', 'Check', '2023-10-16 12:00:00', 'blue:CE', 5, 5);

-- Environment table
INSERT INTO Environment (temperature, humidity, pressure, vibration, chemical_concentration, noise, record_time) VALUES
(25.5, 60.2, 1013.2, 0.1, 0.02, 50, '2023-10-15 00:00:00'),
(26.0, 61.5, 1013.5, 0.2, 0.03, 52, '2023-10-15 03:00:00'),
(25.8, 61.0, 1013.0, 0.15, 0.025, 51, '2023-10-15 06:00:00'),
(25.7, 60.8, 1013.3, 0.12, 0.022, 49, '2023-10-15 09:00:00'),
(26.2, 61.2, 1013.1, 0.18, 0.028, 53, '2023-10-15 12:00:00');