package com.example.backend.service;


import com.example.backend.entity.User;
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
    @Autowired
    private UserService userService;


    public ResponseEntity<Vorschlag> addVorschlag(Vorschlag vorschlag) {
        if (!userService.findById(vorschlag.getUser().getId()).isPresent()) {
            throw new IllegalArgumentException("Reservierung nicht gefunden oder ID nicht angegeben.");
        }
        User user = userService.findById(vorschlag.getUser().getId()).orElse(null);
        vorschlag.setUser(user);
        return ResponseEntity.ok().body(vorschlagRepository.save(vorschlag));
    }
    public ResponseEntity<List<Vorschlag>> getAllVorschlag() {
        return ResponseEntity.ok().body(vorschlagRepository.findAll());
    }
    public ResponseEntity<Optional<Vorschlag>> getVorschlagById(Long id) {
        return ResponseEntity.ok(Optional.of(vorschlagRepository.getById(id)));
    }
}
