package com.example.demo.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;

@Configuration
public class AppConfig
{
    @Bean
    public ModelMapper getModalMapper(){
        return new ModelMapper();
    }
}
