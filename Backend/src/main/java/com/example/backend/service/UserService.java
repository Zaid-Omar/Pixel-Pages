package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.UserRole;
import com.example.backend.repository.ReservierungRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    ReservierungRepository reservierungRepository;

    public User addUser(User user) {
        user.setRoles(Collections.singletonList(UserRole.ROLE_USER));
        return userRepository.save(user);
    }
    public User findByEmail(User user) {
        return userRepository.findByEmail(user.getEmail());
    }
    public User findByBenutzername(User user) {
        return userRepository.findByBenutzername(user.getBenutzername());
    }
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }
    public void update(User user) {
       Optional<User> existingUser= userRepository.findById(user.getId());
            // Setze Vorname, wenn er geändert wurde und nicht leer ist
            if (StringUtils.hasText(user.getVorname()) && !user.getVorname().equals(existingUser.get().getVorname())) {
                existingUser.get().setVorname(user.getVorname());
            }
            // Setze Nachname, wenn er geändert wurde und nicht leer ist
            if (StringUtils.hasText(user.getNachname()) && !user.getNachname().equals(existingUser.get().getNachname())) {
                existingUser.get().setNachname(user.getNachname());
            }
            // Setze Email, wenn sie geändert wurde und nicht leer ist
            if (StringUtils.hasText(user.getEmail()) && !user.getEmail().equals(existingUser.get().getEmail())) {
                existingUser.get().setEmail(user.getEmail());
            }
            // Setze Passwort, wenn es geändert wurde und nicht leer ist
            if (StringUtils.hasText(user.getPasswort()) && !user.getPasswort().equals(existingUser.get().getPasswort())) {
                existingUser.get().setPasswort(user.getPasswort());
            }
            // Setze Rollen, wenn sie geändert wurden
            if (user.getRoles() != null && !user.getRoles().equals(existingUser.get().getRoles())) {
                existingUser.get().setRoles(user.getRoles());
            }
            // Speichere die aktualisierten Daten
        userRepository.updateUser(existingUser.get().getId(), existingUser.get().getVorname(), existingUser.get().getNachname(), existingUser.get().getEmail(), existingUser.get().getPasswort());
    }
    public void delete(Long id) {
        if (roleRepository.existsById(id)) {
            userRepository.deleteById(id);
        }
        if(reservierungRepository.existsByUserId(id)){
            reservierungRepository.deleteByUserId(id);
        }
        userRepository.deleteById(id);
    }
    public List<User> findAll() {
        return userRepository.findAll();
    }
}
