package com.quickLink.url.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class JwtAuthenticationResponse {
    private String Token;
}
