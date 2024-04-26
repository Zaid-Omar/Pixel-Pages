package com.example.backend.repository;


import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public interface ReservierungRepository extends JpaRepository<Reservierung, Long> {

    @Query("SELECT r FROM Reservierung r WHERE r.user.id = :userId")
    List<Reservierung> getReservierungByUserId(@Param("userId") Long userId);
    boolean existsByUserId(Long id);
    boolean existsByMediaId(Long mediaId);
    void deleteByUserId(Long id);
    void deleteByMediaId(Long mediaId);
}
