package com.example.backend.controller;


import com.example.backend.entity.User;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/getAll")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping("/add")
    public ResponseEntity<User> createUser(@RequestBody User user)  {
        return ResponseEntity.ok(userService.addUser(user));
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findById(id));
    }
    @PostMapping("/getUserByEmail")
    public ResponseEntity<Optional<User>> getUserByEmail(@RequestBody User user) {
        return ResponseEntity.ok(Optional.ofNullable(userService.findByEmail(user)));
    }
    @GetMapping("/getByBenutzername")
    public ResponseEntity<Optional<User>> getByBenutzername(@RequestBody User user) {
        return ResponseEntity.ok(Optional.ofNullable(userService.findByBenutzername(user)));
    }

    @GetMapping("/getByBenutzernameAndEmail")
    public ResponseEntity<Optional<User>> getByBenutzernameAndEmail(@RequestBody User user) {
        if (user.getBenutzername() != null && !user.getBenutzername().isEmpty()) {
            Optional<User> userByBenutzername = Optional.ofNullable(userService.findByBenutzername(user));
            return ResponseEntity.ok(userByBenutzername);
        } else if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            Optional<User> userByEmail = Optional.ofNullable(userService.findByEmail(user));
            return ResponseEntity.ok(userByEmail);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {userService.delete(id);}

}
