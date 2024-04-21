package com.example.backend.service;

import com.example.backend.entity.Media;
import com.example.backend.repository.MediaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class MediaService {
    @Autowired
    MediaRepository mediaRepository;

    public List<Media> getAllMedia() {
        return mediaRepository.findAll();
    }
    public List<Media> getMediaByStatus(){
        return mediaRepository.findAllByStatusTrue();
    }

    public Media getMediaById(Long id) {
        return mediaRepository.findById(id).get();
    }
    public Media getMediaByTitle(Media media) {
        return mediaRepository.findByTitel(media.getTitel());
    }

    public Media addMedia(Media media) {

        Media newMedia =Media.builder()
                .titel(media.getTitel())
                .autor(media.getAutor())
                .typ(media.getTyp())
                .status(true)
                .bild(media.getBild())
                .build();

        return mediaRepository.save(media);
    }
    public Media updateMedia(Media media) {
        // Überprüfe, ob das Medium bereits existiert

        if (media.getTitel() == null || mediaRepository.findByTitel(media.getTitel())==null) {
            // Wenn das Medium nicht existiert, wirf eine Ausnahme oder handle den Fehler entsprechend
            throw new IllegalArgumentException("Medium nicht gefunden oder ID nicht angegeben.");
        }
        // Holen des vorhandenen Mediums aus der Datenbank
        Media existingMedia = mediaRepository.findByTitel(media.getTitel());
        // Aktualisieren der Eigenschaften des vorhandenen Mediums mit den Werten des aktualisierten Mediums
        existingMedia.setTitel(media.getTitel());
        existingMedia.setAutor(media.getAutor());
        existingMedia.setTyp(media.getTyp());
        existingMedia.setStatus(media.isStatus());
        // Speichern des aktualisierten Mediums
        return mediaRepository.save(existingMedia);
    }

    public void deleteMedia(Long id) {
        mediaRepository.deleteById(id);
    }

}
