package com.example.demo.request;

import com.example.demo.validate.OnCreate;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class UserRequest
{
    @NotBlank
    private String username;

    @NotBlank
    private String password;
}
