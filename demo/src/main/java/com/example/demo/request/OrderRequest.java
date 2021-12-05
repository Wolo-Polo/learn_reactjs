package com.example.demo.request;

import lombok.Data;

import java.util.Set;

@Data
public class OrderRequest
{
    private Set<OrderDetailRequest> orderDetails;
}
