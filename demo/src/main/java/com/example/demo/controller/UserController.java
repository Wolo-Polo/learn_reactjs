package com.example.demo.controller;

import com.example.demo.exception.ApiException;
import com.example.demo.request.UserRequest;
import com.example.demo.response.LoginResponse;
import com.example.demo.response.RegisterResponse;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;

@Controller
@RequestMapping("/api/v1")
public class UserController
{
    private final String RESOURCE_URI = "/users";
    private final String MEMBER_RESOURCE_URI = RESOURCE_URI + "/{id}";

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity register(@Validated @RequestBody UserRequest userRequest)
        throws ApiException {
        RegisterResponse registerResponse = userService.create(userRequest);

        return ResponseEntity.created(URI.create("/api/v1/register"))
            .body(registerResponse);
    }

    @PostMapping("/login")
    public ResponseEntity login(@Validated @RequestBody UserRequest userRequest) throws ApiException {
        LoginResponse registerResponse = userService.login(userRequest);

        return ResponseEntity.ok(registerResponse);
    }

    @PutMapping(MEMBER_RESOURCE_URI)
    public ResponseEntity update(@PathVariable("id") Long id,
        @RequestParam(value = "username", required = false) String username,
        @RequestParam(value = "avatar", required = false) MultipartFile avatar,
        @RequestParam(value = "phoneNumber", required = false) String phoneNumber,
        @RequestParam(value = "email", required = false) String email,
        @RequestParam(value = "address", required = false) String address,
        @RequestParam(value = "oldPassword", required = false) String oldPassword,
        @RequestParam(value = "newPassword", required = false) String newPassword) throws ApiException, IOException {
        return ResponseEntity.ok(userService.update(id, username, avatar, phoneNumber, email, address, oldPassword, newPassword));
    }

    @GetMapping("/user-detail")
    public ResponseEntity getUserDetailByToken(){
        return ResponseEntity.ok(userService.getUserDetailByToken());
    }

}
