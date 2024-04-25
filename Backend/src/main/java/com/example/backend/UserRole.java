package com.example.backend;

import com.example.backend.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "user_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRole {
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING) // Hier verwenden wir EnumType.STRING, um die Rollen als Zeichenfolge zu speichern
    @Column(name = "roles")
    private com.example.backend.entity.UserRole roles;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



}