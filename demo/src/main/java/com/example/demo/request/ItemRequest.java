package com.example.demo.request;

import com.example.demo.validate.OnCreate;
import com.example.demo.validate.OnUpdate;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class ItemRequest
{
    @NotBlank( groups = {
        OnCreate.class,
        OnUpdate.class
    })
    private String name;
    private String description;
    private String imageUrl;
    private Integer price;
}
