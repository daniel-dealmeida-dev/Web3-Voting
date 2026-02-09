# 🌐 Web3 Voting App

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?logo=ethereum&logoColor=white)
![wagmi](https://img.shields.io/badge/wagmi-FF9900)

---

## 💡 Sobre o projeto

O **Web3 Voting App** é uma aplicação de votação online construída com **React + TypeScript** no frontend e **Solidity** no backend, integrando a blockchain via **wagmi** e **MetaMask**.  

O sistema permite:  
- Criar votações com duas opções e prazo definido.  
- Usuários conectarem suas carteiras e registrarem votos de forma segura.  
- Visualizar contagem de votos em tempo real (após confirmação na blockchain).  

---

## 🏗 Estrutura do Projeto

## 🛠 Tech Stack

- **Frontend:** React + TypeScript + Vite  
- **Blockchain:** Solidity 0.8.21, Ethereum compatible  
- **Web3 integration:** wagmi, MetaMask  
- **Gerenciamento de pacotes:** npm  
- **Estilo:** CSS simples com classes Bootstrap-like  

---

## ⚡ Funcionalidades

1. **Conectar carteira MetaMask**  
   - Autenticação via wagmi.  

2. **Votação em tempo real**  
   - Dois candidatos com botão de votação.  
   - Mostra número de votos após votação ou se o prazo expirar.  

3. **Controle de prazo**  
   - Frontend mostra se a votação expirou.  
   - Backend (Solidity) bloqueia votos após `deadline`.

4. **Backend Solidity**  
   - `Web.sol` com structs `Voting` e `Vote`.  
   - Controle de votação atual (`currentVotingIndex`).  
   - Verificação de votos duplicados.  
   - Somente `owner` pode criar novas votações.

---
### 🖼️ Prints


Print 1:
<img width="1522" height="946" alt="image" src="https://github.com/user-attachments/assets/5a838a5d-517c-4d1f-98f1-c1141742a546" />

---

Print 2:
<img width="1520" height="952" alt="image" src="https://github.com/user-attachments/assets/e84e1d6e-2b99-48cc-873f-9d26dea3d3bc" />

---

Print 3:
<img width="1521" height="960" alt="image" src="https://github.com/user-attachments/assets/3b32e911-c64d-4b98-82aa-0ee3ee8126ce" />

---
## 🏛 Arquitetura

```text
[Usuário] --> [Frontend React/TS] --> [wagmi / MetaMask] --> [Contrato Solidity na Blockchain]
O usuário interage com a interface (clicando em votar, conectando a carteira).

O frontend envia transações via wagmi para o contrato.

O contrato Solidity valida votos, atualiza contadores e mantém a integridade na blockchain.

Hooks do React (useEffect, useState) e funções de readContract/writeContract garantem que a interface reflita o estado real da blockchain em tempo real.

🔧 Desafios Técnicos
Garantir que o frontend refletisse imediatamente o voto na blockchain.

Solução: utilizei useWaitForTransactionReceipt do wagmi para disparar um re-fetch dos dados assim que a transação foi confirmada.

Lidando com deadline de votação no frontend e backend, evitando que votos atrasados fossem contabilizados.

Integrar corretamente a MetaMask com múltiplos estados de conexão (pending, connected, error).

🚀 Como rodar o projeto
✅ Requisitos
Node.js (>=18)

MetaMask instalada

1 Clonar o repositório
git clone https://github.com/seuusuario/web3-voting.git
cd web3-voting
2 Instalar dependências do frontend
npm install
3 Rodar o frontend
npm run dev
4 Deploy do contrato Solidity
Abra contracts/Web.sol no Remix.

Compile com Solidity 0.8.21.

Faça deploy na testnet (Goerli/Sepholia) ou blockchain local.

Atualize CONTRACT_ADDRESS em src/vote.tsx com o endereço do deploy.

🔗 Conexão com Web3
wagmi é usado para conectar a carteira e enviar transações.

readContract -> ler estado atual do contrato (votos, candidatos).

writeContract -> enviar transações de voto.

ABI.json -> interface do contrato Solidity usada pelo frontend.

📈 Melhorias futuras
Adicionar eventos Solidity (VoteCast) para atualizar frontend em tempo real.

Suporte para múltiplas votações simultâneas.

Melhor UX: loading spinners enquanto transações são confirmadas.

Deploy automático usando Hardhat ou Foundry.



📝 Licença

MIT License

👤 Autor

Daniel de Almeida

Estudante e desenvolvedor em busca de oportunidades de estágio/júnior

GitHub: https://github.com/daniel-dealmeida-dev

LinkedIn: https://www.linkedin.com/in/daniel-de-almeida-dev/
