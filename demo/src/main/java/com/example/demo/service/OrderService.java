package com.example.demo.service;

import com.example.demo.entity.Item;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderDetail;
import com.example.demo.entity.User;
import com.example.demo.repository.OrderRepository;
import com.example.demo.request.OrderRequest;
import com.example.demo.response.ItemResponse;
import com.example.demo.response.OrderDetailResponse;
import com.example.demo.response.OrderResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Service
public class OrderService
{
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ModelMapper mapper;

    @Transient
    public OrderResponse createOrder(OrderRequest orderRequest){
        Order order = new Order();
        Set<OrderDetail> orderDetails = new HashSet<>();
        orderRequest.getOrderDetails().forEach(orderDetailRequest -> {
            OrderDetail orderDetail = new OrderDetail();
            Item item = new Item();
            item.setId(orderDetailRequest.getItemId());
            orderDetail.setItem(item);
            orderDetail.setAmount(orderDetailRequest.getAmount());
            orderDetail.setOrder(order);
            orderDetails.add(orderDetail);
        });
        order.setOrderDetails(orderDetails);
        order.setStatus((byte) 1);

        User user = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        order.setUser(user);
        order.setCreatedBy(user.getUsername());
        order.setCreatedAt(LocalDateTime.now());
        order.setModifiedBy(user.getUsername());
        order.setModifiedAt(LocalDateTime.now());
        order.setIsDeleted(false);

        return mapper.map(orderRepository.save(order), OrderResponse.class);
    }

    public Page<OrderResponse> getOrders(Pageable pageable){
        Page<Order> page = orderRepository.findAll(pageable);

        return page.map(i -> {
            Set<OrderDetailResponse> orderDetailResponses = new HashSet<>();
            i.getOrderDetails().forEach(o -> {
                OrderDetailResponse orderDetailResponse = new OrderDetailResponse();
                orderDetailResponse.setId(o.getId());
                orderDetailResponse.setAmount(o.getAmount());
                orderDetailResponse.setItem(mapper.map(o.getItem(), ItemResponse.class));
                orderDetailResponses.add(orderDetailResponse);
            });

            return OrderResponse.builder()
                .id(i.getId())
                .createdBy(i.getCreatedBy())
                .createdAt(i.getCreatedAt())
                .modifiedBy(i.getModifiedBy())
                .modifiedAt(i.getModifiedAt())
                .isDeleted(i.getIsDeleted())
                .status(i.getStatus())
                .orderDetails(orderDetailResponses)
                .build();
        });
    }
}
