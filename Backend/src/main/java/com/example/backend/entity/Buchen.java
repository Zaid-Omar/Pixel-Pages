package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Buchen {

        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE)
        private long id;

        @ManyToOne
        @JoinColumn(name = "user_id", referencedColumnName = "id")
        private User user;

        @ManyToOne
        @JoinColumn(name = "media_id", referencedColumnName = "id")
        private Media media;

        @Temporal(TemporalType.DATE)  // Speichert nur das Datum, nicht die Zeit
        @Column
        private Date aus_datum;

        @Temporal(TemporalType.DATE)  // Speichert nur das Datum, nicht die Zeit
        @Column
        private Date ab_datum;

        @Column
        private Double gebuehren = 0.0;
}
