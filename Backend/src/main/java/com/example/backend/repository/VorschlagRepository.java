package com.example.backend.repository;

import com.example.backend.entity.Vorschlag;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface VorschlagRepository extends JpaRepository<Vorschlag, Long> {

}
