# Projeto de Cadastro de Usuários

Este projeto é uma aplicação web para o cadastro de usuários, desenvolvida com Vue.js no frontend e Node.js com Express no backend. A aplicação consiste em um formulário dividido em quatro etapas, que valida os dados inseridos pelo usuário e envia-os a um servidor via uma API.

## Tecnologias Utilizadas

- **Frontend:** Vue.js 3 (Composition API com `<script setup>` e Vite)
- **Backend:** Node.js com Express
- **Estilos:** CSS customizado (sem frameworks de estilo)

## Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- NPM ou Yarn instalado

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/lucaswd21/desafio-mb-web
   cd desafio-mb-web

2. **Instalando depedências**
   npm install

3. **Buildando a aplicação**
   npm run build

4. **Servindo a aplicação**
   npm run serve

5. **Acesse a aplicação pelo navegador**
   http://localhost:3000/registration

**Validações**
A aplicação valida os seguintes campos:

Email: Deve ser um email válido.
CPF: Deve conter exatamente 11 dígitos numéricos(Sem pontos e traço).
CNPJ: Deve conter exatamente 14 dígitos numéricos(Sem pontos, traço e barra).
Senha: Deve ter ao menos 6 caracteres.
Data de Nascimento/Data de Abertura: Formato dd-mm-aaaa.
Telefone: Deve conter exatamente 11 dígitos numéricos.
Campos Obrigatórios: Todos os campos devem ser preenchidos.
