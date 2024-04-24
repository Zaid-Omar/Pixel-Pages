package com.example.backend.controller;


import com.example.backend.entity.Media;
import com.example.backend.service.MediaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@CrossOrigin
@RestController
@Controller
@RequestMapping("/api/media/")
public class MediaController {

    @Autowired
    private MediaService mediaService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Media>> findAll() {return ResponseEntity.ok(mediaService.getAllMedia());}

    @GetMapping("/getAllStatusTrue")
    public ResponseEntity<List<Media>> getAllStatusTrue() {
        return ResponseEntity.ok(mediaService.getMediaByStatus());
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Media> findById(@PathVariable Long id) {return ResponseEntity.ok(mediaService.getMediaById(id));}

    @GetMapping("/getByIsbn/{isbn}")
    public ResponseEntity<Media> findByIsbn(@PathVariable String isbn) {
        return ResponseEntity.ok(mediaService.getMediaByIsbn(isbn));
    }

    @GetMapping("/getByTitle")
    public ResponseEntity<Media> findByTitle(@RequestBody Media media) {return ResponseEntity.ok(mediaService.getMediaByTitle(media));}

    @PostMapping("/addMedia")
    public ResponseEntity<Media> addMedia(@RequestBody @Valid Media media) {
        return ResponseEntity.ok(mediaService.addMedia(media));
    }

    @PutMapping("/updateMedia")
    public ResponseEntity<Media> updateMedia(@RequestBody Media media) {
        return ResponseEntity.ok(mediaService.updateMedia(media));
    }
    @DeleteMapping("/deleteMedia/{id}")
    public void deleteMedia(@PathVariable Long id) {
      mediaService.deleteMedia(id);
    }

}
