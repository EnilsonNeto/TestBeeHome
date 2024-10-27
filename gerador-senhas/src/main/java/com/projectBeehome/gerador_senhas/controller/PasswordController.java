package com.projectBeehome.gerador_senhas.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projectBeehome.gerador_senhas.model.GeneratePasswordRequest;
import com.projectBeehome.gerador_senhas.model.PasswordHistory;
import com.projectBeehome.gerador_senhas.service.PasswordService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/generate_password")
    public ResponseEntity<Map<String, String>> generatePassword(@RequestBody GeneratePasswordRequest request) {
        String password = passwordService.generatePassword(
            request.getLength(),
            request.isIncludeUppercase(),
            request.isIncludeLowercase(),
            request.isIncludeNumbers(),
            request.isIncludeSpecialChars()
        );

        Map<String, String> response = new HashMap<>();
        response.put("password", password);

        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/password_history")
    public List<PasswordHistory> getPasswordHistory() {
        return passwordService.getPasswordHistory();
    }
}