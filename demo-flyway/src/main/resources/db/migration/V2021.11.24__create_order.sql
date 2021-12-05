CREATE TABLE tbl_order (
    id BIGINT NOT NULL AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    status SMALLINT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    modified_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    modified_by VARCHAR(50) NOT NULL,
    is_deleted BIT(1) DEFAULT b'0' NOT NULL,
    CONSTRAINT PK_order PRIMARY KEY (id),
    CONSTRAINT FK_order_user FOREIGN KEY (user_id) REFERENCES user(id)
)ENGINE = InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE order_detail (
    id BIGINT NOT NULL AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    item_id BIGINT NOT NULL,
    amount SMALLINT DEFAULT 0,
    CONSTRAINT PK_order_detail PRIMARY KEY (id),
    CONSTRAINT FK_order_detail_order FOREIGN KEY (order_id) REFERENCES tbl_order(id),
    CONSTRAINT FK_order_detail_item FOREIGN KEY (item_id) REFERENCES item(id)
)ENGINE = InnoDB DEFAULT CHARSET=utf8mb4;
