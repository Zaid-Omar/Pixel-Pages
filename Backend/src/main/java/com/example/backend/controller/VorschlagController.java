package com.example.backend.controller;

import com.example.backend.entity.Vorschlag;
import com.example.backend.service.VorschlagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/vorschlag/")
public class VorschlagController {

    @Autowired
    private VorschlagService vorschlagService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Vorschlag>> getAll() {
        return ResponseEntity.ok(vorschlagService.getAllVorschlag().getBody());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Optional<Vorschlag>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(vorschlagService.getVorschlagById(id).getBody());
    }

    @PostMapping("/add")
    public ResponseEntity<Vorschlag> add(@RequestBody Vorschlag vorschlag) {
        return ResponseEntity.ok(vorschlagService.addVorschlag(vorschlag).getBody());
    }

}
