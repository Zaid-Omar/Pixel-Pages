package com.example.backend.repository;


import com.example.backend.entity.Media;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MediaRepository extends JpaRepository<Media, Long> {

    Media findByTitel(String title);
    List<Media> findAllByStatusTrue();
    Media findByIsbn(String isbn);
}
