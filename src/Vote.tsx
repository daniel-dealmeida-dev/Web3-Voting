import { useEffect, useState } from 'react';
import { useConfig } from 'wagmi';
import { readContract, writeContract } from '@wagmi/core';
import ABI from './ABI.json';

type Voting = {
    optionOne: string;
    optionTwo: string;
    votesOptionOne: number;
    votesOptionTwo: number;
    deadline: number;
}

export default function Vote() {
    const CONTRACT_ADDRESS = "0xF79d423d4b63d5d339cF5e99f7912533Ffc59591";
    const config = useConfig();

    const [message, setMessage] = useState<string>("");
    const [voting, setVoting] = useState<Voting>({
        optionOne: "",
        optionTwo: "",
        votesOptionOne: 0,
        votesOptionTwo: 0,
        deadline: 0
    });
    const [showVotes, setShowVotes] = useState<boolean>(false);

    // Carregar votação
    const loadVoting = async () => {
        try {
            const result = await readContract(config, {
                address: CONTRACT_ADDRESS,
                abi: ABI,
                chainId: config.chains[0].id,
                functionName: 'getCurrentVoting',
                args: []
            });
            const v = result as Voting;
            setVoting(v);
        } catch (err: any) {
            console.error(err);
            setMessage("Erro ao carregar votação: " + err.message);
        }
    }

    useEffect(() => {
        loadVoting();
    }, []);

    const isExpired = () => Number(voting.deadline) < Date.now() / 1000;

    const getDeadline = () => new Date(Number(voting.deadline) * 1000).toLocaleString("pt-BR");

    const getImageUrl = (name: string) => {
        switch(name) {
            case "Luiz": return "https://www.clickgratis.com.br/blog-clickgratis/wp-content/uploads/2011/11/pica-pau.jpg";
            case "Monica": return "https://tse2.mm.bing.net/th/id/OIP.Zm0ASXgYs-CCyxsoPVbPngAAAA?rs=1&pid=ImgDetMain&o=7&rm=3";
            default: return "https://th.bing.com/th/id/R.c9f978d9a04b1243bd30ea140b78ab70?rik=YSlsHrYQ9WKJmw&pid=ImgRaw&r=0";
        }
    }

    const doVote = async (choice: number) => {
        try {
            await writeContract(config, {
                address: CONTRACT_ADDRESS,
                abi: ABI,
                chainId: config.chains[0].id,
                functionName: 'addvote',
                args: [choice],
            });
            alert(`Voto registrado na opção ${choice}!`);
            setShowVotes(true);
            // Atualiza votos imediatamente
            loadVoting();
        } catch (err: any) {
            console.error(err);
            setMessage("Erro ao registrar voto: " + (err?.message || err));
        }
    }

    return (
        <div className="container px-4 py-5">
            <h1 className="display-5 fw-bold mb-3 text-center">Votação Web</h1>

            <p className="lead mb-3 text-center">
                Participe da nossa votação e faça sua voz ser ouvida.
            </p>  

            {isExpired() ? 
                <p className="lead mb-3 text-danger text-center">A votação expirou.</p>
                :
                <p className="lead mb-3 text-success text-center">
                    Você tem até {getDeadline()} para concluir a votação
                </p>
            }

            {/* Row principal com candidatos */}
            <div className="row justify-content-center align-items-center g-5 py-5" style={{ minHeight: '60vh' }}>

                {/* Candidato 1 */}
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className='mb-3'>{voting.optionOne}</h3>
                    <img 
                        src={getImageUrl(voting.optionOne)} 
                        className="img-fluid rounded mb-3" 
                        width={250} 
                        height={250} 
                        style={{ objectFit: 'cover' }}
                    />
                    { (showVotes || isExpired()) ?
                        <button className='btn btn-secondary p-3' style={{ width: 250 }} disabled>
                            {voting.votesOptionOne} votos
                        </button>
                        :
                        <button className='btn btn-primary p-3' style={{ width: 250 }} onClick={() => doVote(1)}>
                            Prefiro este
                        </button>
                    }
                </div>

                {/* Candidato 2 */}
                <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center">
                    <h3 className='mb-3'>{voting.optionTwo}</h3>
                    <img 
                        src={getImageUrl(voting.optionTwo)} 
                        className="img-fluid rounded mb-3" 
                        width={250} 
                        height={250} 
                        style={{ objectFit: 'cover' }}
                    />
                    { (showVotes || isExpired()) ?
                        <button className='btn btn-secondary p-3' style={{ width: 250 }} disabled>
                            {voting.votesOptionTwo} votos
                        </button>
                        :
                        <button className='btn btn-primary p-3' style={{ width: 250 }} onClick={() => doVote(2)}>
                            Prefiro este
                        </button>
                    }
                </div>

            </div>

            <div className='row align-items-center'>
                <p className='message text-center'>{message}</p>
            </div>
        </div>
    )
}
