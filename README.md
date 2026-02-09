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
   - Controle de estado de conexão (`pending`, `connected`, `error`).  

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

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seuusuario/web3-voting.git
cd web3-voting
2️⃣ Instalar dependências do frontend
cd src
npm install
3️⃣ Rodar o frontend
npm run dev
O frontend vai abrir no http://localhost:5173 (ou porta indicada pelo Vite).

4️⃣ Deploy do contrato Solidity
Abra contracts/Web.sol no Remix.

Compile com Solidity 0.8.21.

Faça deploy na testnet (Goerli/Sepholia) ou na blockchain local.

Atualize CONTRACT_ADDRESS em src/vote.tsx com o endereço do deploy.

🔗 Conexão com Web3
wagmi é usado para conectar a carteira e enviar transações.

readContract → ler estado atual do contrato (votos, candidatos).

writeContract → enviar transações de voto.

ABI.json → interface do contrato Solidity usada pelo frontend.

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

GitHub: https://github.com

LinkedIn: [https://www.linkedin](https://www.linkedin.com/in/daniel-de-almeida-dev/)
