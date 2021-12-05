package com.example.demo.exception;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionHandle
{
    @ExceptionHandler(ApiException.class)
    public ResponseEntity handleExceptionResponse(ApiException exception){


        return ResponseEntity.status(exception.getCode())
            .body(new ExceptionResponse(exception.getCode(), exception.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        return ResponseEntity.status(400)
            .body(new ExceptionResponse(400, exception.getMessage()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ResponseEntity handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException exception){
        return ResponseEntity.status(405)
            .body(new ExceptionResponse(405, exception.getMessage()));
    }
}
