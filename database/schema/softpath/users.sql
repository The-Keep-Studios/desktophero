-- liquibase formatted sql
-- changeset ccostantini
CREATE TABLE IF NOT EXISTS users (
    user_id int(11) AUTO_INCREMENT UNIQUE NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    email_address varchar(255) NOT NULL UNIQUE,
    pass_phrase varchar(255) NOT NULL,
    PRIMARY KEY (user_Id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
-- rollback DROP TABLE IF EXISTS users;
