package com.example.backend.service;

import com.example.backend.dto.ReqRes;
import com.example.backend.entity.User;
import com.example.backend.entity.UserRole;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public ReqRes signUp(ReqRes registrationRequest){
        ReqRes resp = new ReqRes();
        if (!userRepository.existsUserByEmail(registrationRequest.getEmail()) && !userRepository.existsUserByBenutzername(registrationRequest.getBenutzername())) {
            try {
                System.out.println(userRepository.existsUserByEmail(resp.getEmail()) + " " + userRepository.existsUserByBenutzername(resp.getBenutzername()));
                User user = new User();
                user.setVorname(registrationRequest.getVorname());
                user.setNachname(registrationRequest.getNachname());
                user.setBenutzername(registrationRequest.getBenutzername());
                user.setEmail(registrationRequest.getEmail());
                user.setPasswort(passwordEncoder.encode(registrationRequest.getPasswort()));
                user.setRoles(Collections.singletonList(UserRole.ROLE_USER));
                User ourUserResult = userRepository.save(user);
                if (ourUserResult != null && ourUserResult.getId() > 0) {
                    resp.setUser(ourUserResult);
                    resp.setMessage("User Saved Successfully");
                    resp.setStatusCode(200);
                }

            } catch (Exception e) {
                resp.setStatusCode(500);
                resp.setError(e.getMessage());
            }
        }else {resp.setStatusCode(400); resp.setMessage("User already exists");}
        return resp;
    }

    public ReqRes signIn(ReqRes signingRequest){
        ReqRes response = new ReqRes();

        try {

            var user = userRepository.findByEmail(signingRequest.getEmail());
            if (user != null && passwordEncoder.matches(signingRequest.getPasswort(), user.getPasswort())) {
                var jwt = jwtUtils.generateToken(user);
                var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
                response.setStatusCode(200);
                response.setToken(jwt);
                response.setRefreshToken(refreshToken);
                response.setExpirationTime("24Hr");
                response.setMessage("Successfully Signed In");
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            } else {
                response.setStatusCode(401);
                response.setMessage("Invalid credentials");
            }
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public ReqRes refreshToken(ReqRes refreshTokenReqiest){
        ReqRes response = new ReqRes();
        String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
        User users = userRepository.findByEmail(ourEmail);
        if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
            var jwt = jwtUtils.generateToken(users);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setRefreshToken(refreshTokenReqiest.getToken());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Refreshed Token");
        }
        response.setStatusCode(500);
        return response;
    }
}