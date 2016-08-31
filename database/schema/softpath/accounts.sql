-- liquibase formatted sql
-- changeset ccostantini
CREATE TABLE IF NOT EXISTS accounts (
    account_id int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    user_id int(11) NOT NULL,
    first_name varchar(255),
    last_name varchar(255),
    isprimary enum('yes','no') default 'no'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
-- rollback DROP TABLE IF EXISTS accounts;
