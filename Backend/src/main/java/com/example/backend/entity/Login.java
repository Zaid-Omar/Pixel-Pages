package com.example.backend.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Login {
    private String emailOrbenutzername;
    private String password;
    private String token;
    private String refreshToken;
    private int expiresIn;

}
