package com.quickLink.url.service;

import com.quickLink.url.dto.LoginRequest;
import com.quickLink.url.models.User;
import com.quickLink.url.repository.UserRepository;
import com.quickLink.url.security.jwt.JwtAuthenticationResponse;
import com.quickLink.url.security.jwt.JwtUtils;
import com.quickLink.url.serviceImpl.UserDetailsImpl;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public User registerUser(User user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public JwtAuthenticationResponse loginUser(LoginRequest loginRequest){
        Authentication authentication= authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);    //contain the request for entire session
        UserDetailsImpl userDetails= (UserDetailsImpl) authentication.getPrincipal();
        String jwt= jwtUtils.generateToken(userDetails);
        return new JwtAuthenticationResponse(jwt);
    }


    }
