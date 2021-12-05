package com.example.demo.service;

import com.example.demo.common.JWTProvider;
import com.example.demo.entity.User;
import com.example.demo.exception.ApiException;
import com.example.demo.repository.UserRepository;
import com.example.demo.request.UserRequest;
import com.example.demo.response.LoginResponse;
import com.example.demo.response.RegisterResponse;
import com.example.demo.response.UserResponse;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JWTProvider jwtProvider;

    public UserResponse getById(Long id) throws ApiException {
        User user = userRepository.findById(id).orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
        return mapper.map(user, UserResponse.class);
    }

    public RegisterResponse create(UserRequest userRequest) throws ApiException {
        Optional<User> userOptional = userRepository.findByUsername(userRequest.getUsername());
        if(userOptional.isPresent()){
            throw ApiException.RESOURCE_IS_EXISTED;
        }

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setPassword(passwordEncoder.encode(userRequest.getPassword()));
        user.setRoles("USER");
        user.setCreatedBy("BO");
        user.setCreatedAt(LocalDateTime.now());
        user.setModifiedBy("BO");
        user.setModifiedAt(LocalDateTime.now());
        user.setIsDeleted(false);

        userRepository.save(user);
        System.out.println(user.getUsername());
        RegisterResponse registerResponse = new RegisterResponse();
        registerResponse.setUsername(userRequest.getUsername());
        registerResponse.setRoles(user.getRoles());

        return registerResponse;
    }

    public LoginResponse login(UserRequest userRequest) throws ApiException {
        Optional<User> userOptional = userRepository.findByUsername(userRequest.getUsername());
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                userRequest.getUsername(),
                userRequest.getPassword()
            )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.genarateToken((User) authentication.getPrincipal());
        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(((User) authentication.getPrincipal()).getId());
        loginResponse.setAccessToken(token);
        return loginResponse;
    }

    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
    }

    public UserResponse update(Long id, String username, MultipartFile avatar,
        String phoneNumber, String email, String address,
        String oldPassword, String newPassword) throws ApiException, IOException {

        User user = userRepository.findById(id).orElseThrow(() -> ApiException.RESOURCE_NOT_FOUND);
        if(username != null && username.length() != 0) {
            user.setUsername(username);
        }
        if(avatar != null && !avatar.isEmpty()) {
            updateAvatar(user, avatar);
        }
        if(phoneNumber != null && phoneNumber.length() != 0) {
            user.setPhoneNumber(phoneNumber);
        }
        if(email != null && email.length() != 0) {
            user.setEmail(email);
        }
        if(address != null && address.length() != 0) {
            user.setAddress(address);
        }
        if(oldPassword!=null && newPassword!=null) {
            updatePassword(user, oldPassword, newPassword);
        }
        user.setModifiedAt(LocalDateTime.now());
        user.setModifiedBy(user.getUsername());
        userRepository.save(user);

        return mapper.map(user, UserResponse.class);
    }

    private void updateAvatar(User user, MultipartFile avatar) throws IOException {

        Path path = Paths.get("target/classes/static/image/avatar/" + user.getId());
        if(!Files.exists(path)) {
            Files.createDirectories(path);
        }

        Path file = Paths.get(path.toUri()).resolve(avatar.getOriginalFilename());
        OutputStream os = Files.newOutputStream(file);
        os.write(avatar.getBytes());
        os.close();

        String linkAvatar = "/resources/images/avatar/" + user.getId() + "/" + file.getFileName().toString();
        user.setAvatar(linkAvatar);
    }

    private void updatePassword(User user, String oldPassword, String newPassword) throws ApiException {
        if(!passwordEncoder.matches(oldPassword, user.getPassword())){
            throw ApiException.PASSWORD_IS_INVALID;
        }
        validatePassword(newPassword);
        user.setPassword(passwordEncoder.encode(newPassword));
    }

    private void validatePassword(String password) throws ApiException {
        if(password.length() < 1) throw ApiException.PASSWORD_IS_INVALID;
    }
    public UserResponse getUserDetailByToken(){
        User user = (User) SecurityContextHolder.getContext()
            .getAuthentication().getPrincipal();
        return mapper.map(user, UserResponse.class);
    }
}
