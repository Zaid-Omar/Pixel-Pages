package com.example.backend.service;


import com.example.backend.entity.Buchen;
import com.example.backend.entity.Media;
import com.example.backend.entity.User;
import com.example.backend.repository.BuchenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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


    public void updateAllBuchungen(Long userId) {
        LocalDate heute = LocalDate.now();
        Date rueckgabeDatum = java.sql.Date.valueOf(heute);

        List<Buchen> buchungen = buchenRepository.getBuchenByUserId(userId);

        for (Buchen buchung : buchungen) {
            if (buchung.getAus_datum().before(rueckgabeDatum)) {
                double gebuehren = berechneGebuehren(buchung.getAus_datum(), rueckgabeDatum);
                buchung.setGebuehren(gebuehren);
                buchenRepository.save(buchung);
            }
        }
    }

    private double berechneGebuehren(Date ausgabeDatum, Date heute) {
        if (ausgabeDatum.before(heute)) {
            long differenz = heute.getTime() - ausgabeDatum.getTime();
            long tageUeberfaellig = TimeUnit.MILLISECONDS.toDays(differenz);
            return tageUeberfaellig * 3.0; // 3€ pro Tag Verspätung
        }
        return 0.0;
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


}
