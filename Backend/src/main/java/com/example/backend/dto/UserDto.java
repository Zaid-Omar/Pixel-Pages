package com.example.backend.dto;

import com.example.backend.entity.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;
    private String vorname;
    private String nachname;
    private String email;
    private String passwort;
    private UserRole role;

}
