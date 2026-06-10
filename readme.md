# Sistema CRUD com jQuery + Firebase

Este projeto é uma aplicação web para cadastro e controle de clientes e vendedores, desenvolvida com HTML, Bootstrap, jQuery e Firebase Realtime Database.

## Como o sistema funciona
O sistema possui uma home com apresentação do projeto e navegação para as telas de Integrantes, Cliente e Vendedor. Cada tela permite cadastrar, listar, editar e excluir registros, sendo os dados salvos no Firebase em tempo real.

## Banco de dados
A conexão com o Firebase está centralizada em `js/firebase.js`. Utilizamos a Realtime Database para armazenar os cadastros, com chave automática gerada pelo Firebase e campos específicos para cada módulo.

## Como foi desenvolvido
- HTML5 e Bootstrap foram usados para criar a interface e a responsividade.
- jQuery foi utilizado para controlar eventos, manipulação da tabela e CRUD.
- Firebase Realtime Database foi escolhido para persistência de dados em nuvem.
- O projeto foi organizado em páginas separadas para facilitar manutenção e expansão.

## Como o sistema funciona
A interface apresenta uma home com apresentação do projeto e menus para acessar as telas de Integrantes, Cliente e Vendedor. Em cada tela, o usuário pode salvar, editar, listar e excluir registros. Os dados são armazenados no Firebase, então qualquer alteração aparece em tempo real na tabela da página.

## Banco de dados
A conexão com o Firebase está centralizada em js/firebase.js. O sistema utiliza a Realtime Database para guardar as coleções de clientes e vendedores. Cada registro recebe um id automático gerado pelo Firebase, além dos campos necessários para cada módulo.

## Desenvolvimento
- HTML5 e Bootstrap foram usados para montar a interface e o layout responsivo.
- jQuery foi utilizado para controlar eventos do formulário, atualização da tabela e CRUD.
- Firebase Realtime Database foi escolhido para persistência dos dados em nuvem.
- O projeto foi organizado em páginas separadas para facilitar manutenção e expansão.

## Telas principais
- Home: apresentação do sistema e navegação.
- Integrantes: página de cadastro dos integrantes do projeto.
- Cliente: cadastro de clientes com nome, email e telefone.
- Vendedor: cadastro de vendedores com nome, salário e cargo.

## Como executar
1. Abra o projeto em um servidor local, como o Live Server do VS Code.
2. Acesse index.html.
3. Navegue pelas páginas e teste as operações de cadastro, edição, listagem e exclusão.

## Autores
Guilherme Andraz
Pedro Ailton
2º DS