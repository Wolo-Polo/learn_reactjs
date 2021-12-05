package com.example.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ApiException extends Exception
{
    private Integer code;
    private String message;

    public static final ApiException RESOURCE_NOT_FOUND = new ApiException(404, "Resource not found!");
    public static final ApiException RESOURCE_IS_EXISTED = new ApiException(400, "Resource is existed!");
    public static final ApiException AUTHENTICATION_IS_FAIL = new ApiException(400, "Username or password is invalid!");
    public static final ApiException PASSWORD_IS_INVALID = new ApiException(400, "Password is invalid!");
}
