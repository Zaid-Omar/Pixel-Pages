package com.example.backend.repository;

import com.example.backend.entity.Buchen;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Transactional
@Repository
public interface BuchenRepository extends JpaRepository<Buchen, Long> {


    List<Buchen> getBuchenByUserId(Long userId);

}
