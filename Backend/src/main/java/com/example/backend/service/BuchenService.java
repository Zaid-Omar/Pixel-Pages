package com.example.backend.service;


import com.example.backend.entity.Buchen;
import com.example.backend.entity.Media;
import com.example.backend.entity.User;
import com.example.backend.repository.BuchenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
public class BuchenService {
    @Autowired
    private BuchenRepository buchenRepository;
    @Autowired
    UserService userService;
    @Autowired
    MediaService mediaService;


    public List<Buchen> getAllBuchungen() {
        return buchenRepository.findAll();
    }
    public List<Buchen> getBuchungByUser(Long userId){
        return buchenRepository.getBuchenByUserId(userId);
    }
    public Buchen getBuchenById(Long id) {
        return buchenRepository.findById(id).get();
    }
    public Buchen saveBuchen(Buchen buchen) {
        if (buchen.getUser() == null || buchen.getMedia() == null) {
            throw new IllegalArgumentException("Benutzer oder Medien dürfen nicht null sein.");
        }

        if (!userService.findById(buchen.getUser().getId()).isPresent() || mediaService.getMediaById(buchen.getMedia().getId()) == null) {
            throw new IllegalArgumentException("Reservierung nicht gefunden oder ID nicht angegeben.");
        }

        User user = userService.findById(buchen.getUser().getId()).orElse(null);
        Media media = mediaService.getMediaById(buchen.getMedia().getId());

        buchen.setUser(user);
        buchen.setMedia(media);
        buchen.setAb_datum(new Date());
        buchen.setAus_datum(getDateWithoutTime());

        return buchenRepository.save(buchen);
    }

    public void deleteBuchenById(Long id) {
        buchenRepository.deleteById(id);
    }

    public Buchen updateBuchen(Long id, Date tatsaechlichesRueckgabeDatum) {
        Buchen vorhandeneBuchen = buchenRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Buchung nicht gefunden."));
        double gebuehren = berechneGebuehren(vorhandeneBuchen.getAb_datum(), tatsaechlichesRueckgabeDatum);
        vorhandeneBuchen.setGebuehren(gebuehren);

        return buchenRepository.save(vorhandeneBuchen);
    }


    private Date getDateWithoutTime() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DATE, 14);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }

    private double berechneGebuehren (Date rueckgabeDatum, Date heute) {
        if (rueckgabeDatum.before(heute)) {
            long differenz = heute.getTime() - rueckgabeDatum.getTime();
            long tageUeberfaellig = TimeUnit.MILLISECONDS.toDays(differenz);
            return tageUeberfaellig * 5.0;  // 5€ pro Tag Verspätung
        }
        return 0.0;
    }
}
