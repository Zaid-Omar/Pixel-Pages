package com.example.backend.repository;


import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservierungRepository extends JpaRepository<Reservierung, Long> {

    Reservierung findByUser(User user);
}
