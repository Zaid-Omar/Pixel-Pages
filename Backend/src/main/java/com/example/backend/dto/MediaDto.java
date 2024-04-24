package com.example.backend.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MediaDto {

    private Long id;
    private String titel;
    private String autor;
    private String typ;
    private boolean status;
}
