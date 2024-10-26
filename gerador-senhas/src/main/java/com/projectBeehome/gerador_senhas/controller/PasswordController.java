package com.projectBeehome.gerador_senhas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projectBeehome.gerador_senhas.model.PasswordHistory;
import com.projectBeehome.gerador_senhas.service.PasswordService;

@RestController
@RequestMapping("/api")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @PostMapping("/generate_password")
    public String generatePassword(
            @RequestParam int length,
            @RequestParam boolean includeUppercase,
            @RequestParam boolean includeLowercase,
            @RequestParam boolean includeNumbers,
            @RequestParam boolean includeSpecialChars) {
        return passwordService.generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSpecialChars);
    }

    @GetMapping("/password_history")
    public List<PasswordHistory> getPasswordHistory() {
        return passwordService.getPasswordHistory();
    }
}