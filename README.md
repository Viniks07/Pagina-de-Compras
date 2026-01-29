# Processo Seletivo Frontend

Este repositório contém a solução para o desafio técnico de estágio para a vaga de **Desenvolvedor Frontend**. O projeto consiste em uma aplicação de compra simplificada, focada em uma experiência de usuário fluida e gerenciamento de estado robusto.

## O Processo

O objetivo era desenvolver um fluxo de compra funcional, compreendendo as etapas de seleção de produtos e checkout, seguindo fielmente o design proposto e os requisitos técnicos obrigatórios.

### Escopo do Projeto:
* **Página de Produto:** Interface para seleção de quantidades.
* **Finalização de Compra:** Formulário estruturado com validações de dados.
* **Resumo do Pedido:** Exibição dinâmica do valor total da compra.
* **Persistência:** Manutenção dos dados no navegador para evitar perda de informações durante o refresh.

---

## Tecnologias

Para atender aos requisitos obrigatórios e garantir a melhor performance, foram utilizadas as seguintes ferramentas:

* **ReactJS:** Biblioteca base para a construção da interface componentizada.
* **Material-UI (MUI):** Framework de UI para garantir um design moderno e **total responsividade**.
* **Redux:** Arquitetura centralizada para o gerenciamento do estado global da aplicação.
* **Redux-Form:** Implementação de formulários conectada ao estado do Redux, garantindo validações precisas.
* **React Router:** Gerenciamento de navegação entre as páginas (SPA).

---

## Arquitetura

* **Responsividade:** A interface foi construída utilizando o sistema de *breakpoints* do Material-UI, garantindo que a experiência seja impecável tanto em desktops quanto em dispositivos móveis.
* **Validações:** O formulário de checkout conta com verificações em tempo real para campos obrigatórios, garantindo a integridade dos dados antes da finalização.
* **Arquitetura de Pastas:** * `components/`: Componentes reutilizáveis de UI.
    * `pages/`: Views principais do fluxo.
    * `store/`: Configurações de Reducers, Actions e Store do Redux.
* **Persistência Local:** Utilização de `localStorage` para simular a permanência de dados sem a necessidade de uma API de backend.

---

## Como Executar o Projeto

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/Viniks07/Pagina-de-Compras.git

2. **Instale as dependências:**
   ```bash
   # Por conflito de versões instale assim
   npm install --legacy-peer-deps
   


3. **Clone este repositório:**
   ```bash
   npm start

A aplicação estará disponível em http://localhost:3000.

## Design de Referência
O desenvolvimento foi guiado pelos designs: [Imagens referencia](https://github.com/Viniks07/Pagina-de-Compras/tree/main/src/assets/design)
