package com.example.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController
{
    @RequestMapping("/api/v1/health-check")
    public ResponseEntity checkHealth(){
        return ResponseEntity.ok("OK");
    }
}
