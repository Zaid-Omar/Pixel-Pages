package com.example.backend.entity;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Reservierung {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"vorname", "nachname", "username", "benutzername","passwort","email", "password", "roles", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"titel", "autor", "typ", "status", "bild", "isbn"})
    private Media media;

    @Column
    private Date aus_datum;
    @Column
    private Date ab_datum;

}