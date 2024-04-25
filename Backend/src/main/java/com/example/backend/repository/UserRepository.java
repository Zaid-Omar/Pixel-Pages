package com.example.backend.repository;

import com.example.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Transactional
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByBenutzername(String username);
    User findByEmail(String email);
    User findByBenutzernameAndEmail(String email,String benutzername);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.benutzername = :benutzername")
    boolean existsUserByBenutzername(@Param("benutzername") String benutzername);

    @Query("SELECT CASE WHEN COUNT(u) > 0 THEN true ELSE false END FROM User u WHERE u.email = :email")
    boolean existsUserByEmail(@Param("email") String email);
    @Modifying
    @Query("UPDATE User u SET u.vorname = :vorname, u.nachname = :nachname, u.email = :email, u.passwort = :passwort WHERE u.id = :id")
    void updateUser(@Param("id") Long id,
                    @Param("vorname") String vorname,
                    @Param("nachname") String nachname,
                    @Param("email") String email,
                    @Param("passwort") String passwort);
}

