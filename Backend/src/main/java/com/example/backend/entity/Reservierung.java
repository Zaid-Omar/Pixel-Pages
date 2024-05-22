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
    @JsonIgnoreProperties(value = {"vorname", "nachname", "username", "benutzername","passwort", "password", "roles", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled"})
    private User user;

    @ManyToOne
    @JoinColumn(name = "media_id", referencedColumnName = "id")
    @JsonIgnoreProperties(value = {"autor", "typ", "status", "bild"})
    private Media media;
    @Temporal(TemporalType.DATE)  // Speichert nur das Datum, nicht die Zeit
    @Column
    private Date aus_datum;

    @Temporal(TemporalType.DATE)  // Speichert nur das Datum, nicht die Zeit
    @Column
    private Date ab_datum;

}