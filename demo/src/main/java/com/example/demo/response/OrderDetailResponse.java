package com.example.demo.response;

import lombok.Data;

@Data
public class OrderDetailResponse
{
    private Long id;

    private ItemResponse item;

    private Integer amount;
}
