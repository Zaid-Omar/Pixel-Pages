package com.example.backend.repository;


import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface ReservierungRepository extends JpaRepository<Reservierung, Long> {

    Reservierung findByUser(User user);
    boolean existsByUserId(Long id);
    boolean existsByMediaId(Long mediaId);
    void deleteByUserId(Long id);
    void deleteByMediaId(Long mediaId);
}
