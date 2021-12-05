package com.example.demo.request;

import lombok.Data;

@Data
public class OrderDetailRequest
{
    private Long itemId;

    private Integer amount;
}
