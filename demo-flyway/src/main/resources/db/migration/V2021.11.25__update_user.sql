ALTER TABLE user
    ADD COLUMN avatar VARCHAR(256),
    ADD COLUMN phone_number CHAR(15),
    ADD COLUMN email VARCHAR(50),
    ADD COLUMN address VARCHAR(200);

CREATE UNIQUE index user_username_uindex
	ON user(username);
