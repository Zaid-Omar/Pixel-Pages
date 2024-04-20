package com.example.backend.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@Table
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Media
{
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;


    @NotNull
    @Column(unique = true )
    private String titel;

    @Column
    private String autor;
    @NotNull
    @Column
    private String typ;
    @NotNull
    @Column
    private boolean status;
}
