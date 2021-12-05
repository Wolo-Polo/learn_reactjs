DROP TABLE IF EXISTS item;

CREATE TABLE item (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    image_url VARCHAR(256),
    price INT DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by VARCHAR(50) NOT NULL,
    is_deleted BIT(1) DEFAULT b'0' NOT NULL,
    CONSTRAINT PK_item PRIMARY KEY (id)
)ENGINE = InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE item ADD FULLTEXT searching_by_name_index (name);
ALTER TABLE item ADD FULLTEXT searching_by_description_index (description);
