package com.example.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.backend.entity.Media;
import com.example.backend.entity.Reservierung;
import com.example.backend.entity.User;
import com.example.backend.repository.ReservierungRepository;
import com.example.backend.service.MediaService;
import com.example.backend.service.ReservierungService;
import com.example.backend.service.UserService;

@SpringBootTest
public class ReservierungServiceTest {

    @InjectMocks
    private ReservierungService reservierungService;

    @Mock
    private ReservierungRepository reservierungRepository;

    @Mock
    private UserService userService;

    @Mock
    private MediaService mediaService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFindAll() {
        List<Reservierung> reservierungen = List.of(new Reservierung());
        when(reservierungRepository.findAll()).thenReturn(reservierungen);

        List<Reservierung> result = reservierungService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reservierungRepository, times(1)).findAll();
    }

    @Test
    public void testFindById() {
        Reservierung reservierung = new Reservierung();
        reservierung.setId(1L);
        when(reservierungRepository.findById(1L)).thenReturn(Optional.of(reservierung));

        Reservierung result = reservierungService.findById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(reservierungRepository, times(1)).findById(1L);
    }

    @Test
    public void testFindByUser() {
        List<Reservierung> reservierungen = List.of(new Reservierung());
        when(reservierungRepository.getReservierungByUserId(1L)).thenReturn(reservierungen);

        List<Reservierung> result = reservierungService.findByUser(1L);

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(reservierungRepository, times(1)).getReservierungByUserId(1L);
    }

    @Test
    public void testAddReservierung() {
        User user = new User();
        user.setId(1L);
        Media media = new Media();
        media.setId(1L);
        Reservierung reservierung = new Reservierung();
        reservierung.setUser(user);
        reservierung.setMedia(media);

        when(userService.findById(1L)).thenReturn(Optional.of(user));
        when(mediaService.getMediaById(1L)).thenReturn(media);
        when(reservierungRepository.save(any(Reservierung.class))).thenReturn(reservierung);

        Reservierung result = reservierungService.add(reservierung);

        assertNotNull(result);
        assertEquals(user, result.getUser());
        assertEquals(media, result.getMedia());
        assertNotNull(result.getAb_datum());
        assertNotNull(result.getAus_datum());
        verify(userService, times(2)).findById(1L);
        verify(mediaService, times(1)).getMediaById(1L);
        verify(reservierungRepository, times(1)).save(reservierung);
    }

    @Test
    public void testUpdateReservierung() {
        Reservierung reservierung = new Reservierung();
        reservierung.setId(1L);
        when(reservierungRepository.save(any(Reservierung.class))).thenReturn(reservierung);

        Reservierung result = reservierungService.update(reservierung);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(reservierungRepository, times(1)).save(reservierung);
    }

    @Test
    public void testDeleteReservierung() {
        doNothing().when(reservierungRepository).deleteById(1L);

        reservierungService.delete(1L);

        verify(reservierungRepository, times(1)).deleteById(1L);
    }

    @Test
    public void testGetDateWithoutTime() {
        Date date = reservierungService.getDateWithoutTime();
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);

        assertEquals(0, cal.get(Calendar.HOUR_OF_DAY));
        assertEquals(0, cal.get(Calendar.MINUTE));
        assertEquals(0, cal.get(Calendar.SECOND));
        assertEquals(0, cal.get(Calendar.MILLISECOND));
    }
}
