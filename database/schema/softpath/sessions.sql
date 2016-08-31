-- liquibase formatted sql
-- changeset ccostantini
CREATE TABLE IF NOT EXISTS sessions (
    token varchar(255) NOT NULL UNIQUE,
    user_id int(11),
    time_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires timestamp NOT NULL,
    session_data text,
    PRIMARY KEY (token),
    KEY (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE utf8_bin;
-- rollback DROP TABLE IF EXISTS sessions;
