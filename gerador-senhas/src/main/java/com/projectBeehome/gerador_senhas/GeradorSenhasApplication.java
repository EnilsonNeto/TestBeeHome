package com.projectBeehome.gerador_senhas;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import com.projectBeehome.gerador_senhas.service.PasswordService;

@SpringBootApplication
public class GeradorSenhasApplication {

    @Autowired
    public static void main(String[] args) {
        SpringApplication.run(GeradorSenhasApplication.class, args);
    }
}
