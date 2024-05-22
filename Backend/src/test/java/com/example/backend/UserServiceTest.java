package com.example.backend;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import com.example.backend.entity.User;
import com.example.backend.repository.ReservierungRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private ReservierungRepository reservierungRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddUser() {
        User user = new User();
        when(userRepository.save(any(User.class))).thenReturn(user);

        User result = userService.addUser(user);

        assertNotNull(result);
        assertEquals(Collections.singletonList(new UserRole().getRoles()), user.getRoles());
        verify(userRepository, times(1)).save(user);
    }

    @Test
    public void testFindByEmail() {
        User user = new User();
        user.setEmail("test@example.com");
        when(userRepository.findByEmail(user.getEmail())).thenReturn(user);

        User result = userService.findByEmail(user);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        verify(userRepository, times(1)).findByEmail(user.getEmail());
    }

    @Test
    public void testFindByBenutzername() {
        User user = new User();
        user.setBenutzername("username");
        when(userRepository.findByBenutzername(user.getBenutzername())).thenReturn(user);

        User result = userService.findByBenutzername(user);

        assertNotNull(result);
        assertEquals("username", result.getBenutzername());
        verify(userRepository, times(1)).findByBenutzername(user.getBenutzername());
    }

    @Test
    public void testFindById() {
        User user = new User();
        user.setId(1L);
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        Optional<User> result = userService.findById(1L);

        assertTrue(result.isPresent());
        assertEquals(1L, result.get().getId());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    public void testUpdate() {
        User user = new User();
        user.setId(1L);
        user.setVorname("NewName");
        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setVorname("OldName");
        when(userRepository.findById(1L)).thenReturn(Optional.of(existingUser));

        userService.update(user);

        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).updateUser(eq(1L), eq("NewName"), anyString(), anyString(), anyString());
    }

    @Test
    public void testDelete() {
        when(roleRepository.existsById(1L)).thenReturn(true);
        when(reservierungRepository.existsByUserId(1L)).thenReturn(true);

        userService.delete(1L);

        verify(userRepository, times(2)).deleteById(1L);
        verify(reservierungRepository, times(1)).deleteByUserId(1L);
    }

    @Test
    public void testFindAll() {
        List<User> users = Collections.singletonList(new User());
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.findAll();

        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository, times(1)).findAll();
    }
}
