package com.example.backend.controller;


import com.example.backend.entity.Buchen;
import com.example.backend.service.BuchenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@Controller
@RequestMapping("/api/buchen")
public class BuchenController {
    @Autowired
    private BuchenService buchenService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Buchen>> getBuchen() {
        return ResponseEntity.ok(buchenService.getAllBuchungen());
    }
    @GetMapping("getById/{id}")
    public ResponseEntity<Buchen> getBuchenById(@PathVariable Long id) {
        return ResponseEntity.ok(buchenService.getBuchenById(id));
    }
    @GetMapping("getByUserId/{id}")
    public ResponseEntity<List<Buchen>> getBuchenByUser(@PathVariable Long id) {
        return ResponseEntity.ok(buchenService.getBuchungByUser(id));
    }
    @PostMapping("/add")
    public ResponseEntity<Buchen> addBuchen(@RequestBody Buchen buchen) {
        return ResponseEntity.ok(buchenService.saveBuchen(buchen));
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Buchen> updateBuchen(@PathVariable Long id, @RequestBody Date rueckgabeDatum) {
        return ResponseEntity.ok(buchenService.updateBuchen(id, rueckgabeDatum));
    }

    @DeleteMapping("/deleteById/{id}")
    public void deleteBuchen(@PathVariable Long id) {buchenService.deleteBuchenById(id);}

}
