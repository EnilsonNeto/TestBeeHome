package com.projectBeehome.gerador_senhas.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projectBeehome.gerador_senhas.model.PasswordHistory;

public interface PasswordRepository extends JpaRepository<PasswordHistory, Long> {
}
