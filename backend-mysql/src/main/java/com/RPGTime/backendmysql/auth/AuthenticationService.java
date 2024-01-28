package com.RPGTime.backendmysql.auth;

import com.RPGTime.backendmysql.config.JwtService;
import com.RPGTime.backendmysql.enums.Role;
import com.RPGTime.backendmysql.models.User;
import com.RPGTime.backendmysql.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    public AuthenticationResponse register(RegisterRequest request) {

        if(repository.findByUsername(request.getUsername()).isPresent()) {
            return AuthenticationResponse.builder()
                    .token("UsernameTaken")
                    .build();
        }
        if(repository.findByEmail(request.getEmail()).isPresent()) {
            return AuthenticationResponse.builder()
                    .token("EmailTaken")
                    .build();
        }
        var user = new User(request.getUsername(), passwordEncoder.encode(request.getPassword()), request.getEmail(), Role.USER);
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = repository.findByUsername(request.getUsername()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
