package com.example.backend.dto;

import com.example.backend.entity.User;
import com.example.backend.entity.UserRole;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReqRes {

    private int statusCode;
    private String error;
    private String message;
    private String token;
    private String refreshToken;
    private String expirationTime;
    private String vorname;
    private String nachname;
    private String benutzername;
    private String email;
    private String passwort;
    private List<UserRole> roles;
    private User user;
}