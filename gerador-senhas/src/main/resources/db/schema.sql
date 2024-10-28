DO
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'gerador_senhas') THEN
        EXECUTE 'CREATE DATABASE gerador_senhas';
    END IF;
END
$$;

\connect gerador_senhas;

CREATE TABLE IF NOT EXISTS password_history (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    generated_at TIMESTAMP NOT NULL
);
