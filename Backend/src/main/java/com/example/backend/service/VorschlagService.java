package com.example.backend.service;


import com.example.backend.entity.Vorschlag;
import com.example.backend.repository.VorschlagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VorschlagService {

    @Autowired
    private VorschlagRepository vorschlagRepository;


    public ResponseEntity<Vorschlag> addVorschlag(Vorschlag vorschlag) {
        return ResponseEntity.ok().body(vorschlagRepository.save(vorschlag));
    }
    public ResponseEntity<List<Vorschlag>> getAllVorschlag() {
        return ResponseEntity.ok().body(vorschlagRepository.findAll());
    }
    public ResponseEntity<Optional<Vorschlag>> getVorschlagById(Long id) {
        return ResponseEntity.ok(Optional.of(vorschlagRepository.getById(id)));
    }
}
