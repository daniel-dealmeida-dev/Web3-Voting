// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

/*
    Estrutura que representa uma votação simples
    com duas opções, contadores de votos e tempo limite
*/
struct Voting {
    string optionOne;
    uint256 votesOptionOne;

    string optionTwo;
    uint256 votesOptionTwo;

    uint256 deadline;
}

struct Vote {
    uint256 choice; // 1 or 2
    uint256 date;
}

contract Web {
    // Endereço do dono do contrato (quem fez o deploy)
    address owner;

    // Índice da votação atual
    uint256 public currentVotingIndex = 0;

    // Lista de votações criadas
    Voting[] public votings;

    // Armazena os votos por votação e por endereço
    mapping(uint256 => mapping(address => Vote)) public votes;

    /*
        Constructor é executado apenas uma vez,
        no momento do deploy do contrato
    */
    constructor() {
        owner = msg.sender;
    }

    /*
        Retorna a votação atual
        view: não altera o estado da blockchain
    */
    function getCurrentVoting() public view returns (Voting memory) {
        require(votings.length > 0, "No voting available");
        return votings[currentVotingIndex];
    }

    /*
        Cria uma nova votação
        Apenas o owner pode chamar essa função
    */
    function addVoting(
        string memory _optionOne,
        string memory _optionTwo,
        uint256 _votingDuration
    ) public {
        // Garante que apenas o dono do contrato pode criar votações
        require(msg.sender == owner, "Invalid sender");

        // Avança o índice caso já exista alguma votação
        if (votings.length > 0) {
            currentVotingIndex++;
        }

        // Cria a nova votação em memória
        Voting memory newVoting;
        newVoting.optionOne = _optionOne;
        newVoting.optionTwo = _optionTwo;
        newVoting.deadline = block.timestamp + _votingDuration;

        // Adiciona a votação ao array
        votings.push(newVoting);
    }

    function addvote(uint256 choice) public {
        require(choice == 1 || choice == 2, "invalid choice");
        require(votings.length > 0, "No open voting");
        require(
            votings[currentVotingIndex].deadline > block.timestamp,
            "No open voting"
        );
        require(
            votes[currentVotingIndex][msg.sender].date == 0,
            "You already voted on this voting"
        );

        votes[currentVotingIndex][msg.sender].choice = choice;
        votes[currentVotingIndex][msg.sender].date = block.timestamp;

        if (choice == 1) {
            votings[currentVotingIndex].votesOptionOne++;
        } else {
            votings[currentVotingIndex].votesOptionTwo++;
        }
    }
}
