package com.projectBeehome.gerador_senhas.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.projectBeehome.gerador_senhas.model.PasswordHistory;
import com.projectBeehome.gerador_senhas.repository.PasswordRepository;

@Service
public class PasswordService {

    @Autowired
    private PasswordRepository repository;

    public String generatePassword(int length, boolean includeUppercase, boolean includeLowercase, boolean includeNumbers, boolean includeSpecialChars) {
        String upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String specialChars = "!@#$%^&*()-_=+";
        
        String allowedChars = "";
        if (includeUppercase) allowedChars += upperCaseLetters;
        if (includeLowercase) allowedChars += lowerCaseLetters;
        if (includeNumbers) allowedChars += numbers;
        if (includeSpecialChars) allowedChars += specialChars;

        Random random = new Random();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(allowedChars.charAt(random.nextInt(allowedChars.length())));
        }

        // Salvando no banco de dados
        PasswordHistory passwordHistory = new PasswordHistory();
        passwordHistory.setPassword(password.toString());
        passwordHistory.setGeneratedAt(LocalDateTime.now());
        repository.save(passwordHistory);

        return password.toString();
    }

    public List<PasswordHistory> getPasswordHistory() {
        return repository.findAll();
    }
}
