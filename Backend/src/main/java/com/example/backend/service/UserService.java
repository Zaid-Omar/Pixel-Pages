package com.example.backend.service;

import com.example.backend.entity.User;
import com.example.backend.entity.UserRole;
import com.example.backend.repository.ReservierungRepository;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public User update(User user) {
        return userRepository.save(user);
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
