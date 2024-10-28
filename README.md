# Teste para Vaga de Pleno Full Stack

Bem-vindo ao repositório deste teste desenvolvido para a vaga de pleno full stack. Este projeto foi criado para demonstrar habilidades em Angular 18, Java 23 e Spring Boot.

## Visão Geral

Este projeto é uma aplicação web que permite a geração de senhas de forma segura e o armazenamento do histórico de senhas geradas. A aplicação utiliza Angular para o frontend e Java com Spring Boot para o backend, garantindo uma arquitetura robusta e eficiente.

### Principais Funcionalidades

- **Geração de Senhas**: 
  - Tela principal com um formulário que permite a personalização da senha.
  - Opções para definir o comprimento da senha, incluir letras maiúsculas, minúsculas, números e caracteres especiais.
  - Botão para gerar a senha com base nas opções selecionadas.
  - Exibição da senha gerada em um campo de texto.

- **Histórico de Senhas**: 
  - Exibição de uma lista das senhas geradas anteriormente.
  - Salvamento de cada senha gerada no banco de dados com a data e hora da geração.

## Demonstração

Para uma visualização rápida do projeto, você pode assistir aos vídeos abaixo. Eles mostram uma demonstração das principais funcionalidades e como utilizar o aplicativo.

![Demonstração do Projeto - Geração de Senhas](frontendAngular/src/assets/computer.gif)
![Demonstração do Projeto - Histórico de Senhas](frontendAngular/src/assets/mobile.gif)

## Como Executar o Projeto

1. Clone este repositório para sua máquina local:
    ```bash
    git clone https://github.com/EnilsonNeto/TestBeeHome.git
    ```

2. Navegue até o diretório do projeto:
    ```bash
    cd TestBeeHome
    ```

3. Para o **Frontend**:
   - Navegue até a pasta do frontend:
     ```bash
     cd frontendAngular
     ```
   - Instale as dependências utilizando o Node.js 22.x:
     ```bash
     npm install
     ```
   - Execute a aplicação:
     ```bash
     npm start
     ```

4. Para o **Backend**:
   - Navegue até a pasta do backend:
     ```bash
     cd gerador-senhas
     ```
   - Compile e execute a aplicação Java:
     ```bash
     mvn spring-boot:run
     ```

5. **Configurações do Banco de Dados**:
   - Dentro do diretório `src/main/resources`, você encontrará uma pasta chamada `db`, onde estão os scripts `schema.sql` e `data.sql` que contêm os scripts para criação da tabela e dados de teste.
   - Além disso, no arquivo `src/main/resources/application.properties`, altere a senha do PostgreSQL para a sua configuração local, garantindo que a aplicação funcione corretamente ao rodar.

6. Acesse a aplicação em seu navegador em `http://localhost:4200` para o frontend e `http://localhost:8080/api` para os endpoints do backend.

## Endpoints da API

### Geração de Senhas

- **POST** `/api/generate_password`: Gera uma nova senha com base nas opções fornecidas.

### Histórico de Senhas

- **GET** `/api/password_history`: Lista todas as senhas geradas anteriormente.

## Estrutura do Banco de Dados

O banco de dados é modelado para armazenar o histórico de senhas geradas. O script SQL para a criação da database e da tabela é o seguinte:

```sql
CREATE DATABASE gerador_senhas;

\connect gerador_senhas;

CREATE TABLE IF NOT EXISTS password_history (
    id SERIAL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    generated_at TIMESTAMP NOT NULL
);
