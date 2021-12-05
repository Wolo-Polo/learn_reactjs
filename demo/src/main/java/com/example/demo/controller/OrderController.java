package com.example.demo.controller;


import com.example.demo.request.ItemRequest;
import com.example.demo.request.OrderRequest;
import com.example.demo.service.OrderService;
import com.example.demo.validate.OnCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.net.URI;

@Controller
@RequestMapping("/api/v1")
public class OrderController
{
    private final String RESOURCE_URI = "/orders";
    private final String MEMBER_RESOURCE_URI = RESOURCE_URI + "/{id}";

    @Autowired
    private OrderService orderService;

    @GetMapping(RESOURCE_URI)
    public ResponseEntity getOders(
        @RequestParam(required=false, name="page", defaultValue = "1") Integer page,
        @RequestParam(required=false, name="size", defaultValue = "10") Integer size){

        Pageable pageRequest = PageRequest.of(page - 1 , size, Sort.by(Sort.Direction.DESC, "createdAt"));

        return ResponseEntity.ok(orderService.getOrders(pageRequest));
    }

    @PostMapping(RESOURCE_URI)
    public ResponseEntity createOrder(@RequestBody OrderRequest orderRequest) {
        orderService.createOrder(orderRequest);

        return ResponseEntity.created(URI.create(RESOURCE_URI)).build();
    }

}
