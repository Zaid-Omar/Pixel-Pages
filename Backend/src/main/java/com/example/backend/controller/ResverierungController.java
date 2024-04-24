package com.example.backend.controller;

import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import com.example.backend.service.ReservierungService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservierung/")
@CrossOrigin
public class ResverierungController {
    @Autowired
    private ReservierungService reservierungService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Reservierung>> findAll() {
        return ResponseEntity.ok(reservierungService.findAll());
    }
    @GetMapping("/getById/{id}")
    public ResponseEntity<Reservierung> findById(@PathVariable Long id) {
        return ResponseEntity.ok(reservierungService.findById(id));
    }
    @GetMapping("/getByUser")
    public ResponseEntity<Reservierung> findByUser(@RequestBody User user) {
        return ResponseEntity.ok(reservierungService.findByUser(user));
    }
    @PostMapping("/add")
    public ResponseEntity<Reservierung> save(@RequestBody Reservierung reservierung) {
        return ResponseEntity.ok(reservierungService.add(reservierung));
    }
    @PutMapping("/update")
    public ResponseEntity<Reservierung> update(@RequestBody Reservierung reservierung) {
        return ResponseEntity.ok(reservierungService.update(reservierung));
    }
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        reservierungService.delete(id);
    }


}
