package com.example.backend.service;

import com.example.backend.entity.Media;
import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import com.example.backend.repository.ReservierungRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class ReservierungService {
    @Autowired
    ReservierungRepository reservierungRepository;
    @Autowired
    UserService userService;
    @Autowired
    MediaService mediaService;

    public List<Reservierung> findAll() {
        return reservierungRepository.findAll();
    }
    public Reservierung findById(Long id) {
        return reservierungRepository.findById(id).orElse(null);
    }
    public List<Reservierung> findByUser(Long id) {
         return reservierungRepository.getReservierungByUserId(id);
    }

    public Reservierung add(Reservierung reservierung) {

        if (!userService.findById(reservierung.getUser().getId()).isPresent() && mediaService.getMediaById(reservierung.getMedia().getId()) ==null) {
            throw new IllegalArgumentException("Reservierung nicht gefunden oder ID nicht angegeben.");
        }
        User user = userService.findById(reservierung.getUser().getId()).orElse(null);
        Media media = mediaService.getMediaById(reservierung.getMedia().getId());

        reservierung.setUser(user);
        reservierung.setMedia(media);
        reservierung.setAb_datum(new Date());


        reservierung.setAus_datum(getDateWithoutTime());

        return reservierungRepository.save(reservierung);
    }
    public Reservierung update(Reservierung reservierung) {
        return reservierungRepository.save(reservierung);
    }
    public void delete(Long id) {
        reservierungRepository.deleteById(id);
    }

    private Date getDateWithoutTime() {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.DATE, 7);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        return cal.getTime();
    }
}
