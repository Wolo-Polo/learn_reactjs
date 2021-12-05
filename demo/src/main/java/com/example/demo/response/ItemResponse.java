package com.example.demo.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ItemResponse
{
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private Integer price;
    private LocalDateTime createdAt;
    private String createdBy;
    private LocalDateTime modifiedAt;
    private String modifiedBy;
}
