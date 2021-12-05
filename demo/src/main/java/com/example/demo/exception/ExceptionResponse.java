package com.example.demo.exception;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExceptionResponse
{
    private Integer code;
    private String message;

    public ExceptionResponse get(){
        return this;
    }
}
