'use client'

import { useConnect } from 'wagmi'

function Login() {
  const { connect, connectors, error, status } = useConnect()

  return (
    <div className="container px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">

        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://image.freepik.com/vetores-gratis/as-pessoas-votam-em-candidatos-de-diferentes-partidos-votacao-eleitoral-votacao-e-politica-escolha-democracia_1284-42305.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Votação"
          />
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold mb-3">
            Votação Web
          </h1>

          <p className="lead mb-3">
            Autentique-se com sua carteira e deixe seu voto
          </p>

          <button
            onClick={() => connect({ connector: connectors[0] })}
            disabled={status === 'pending'}
            className="btn btn-primary btn-lg d-flex align-items-center gap-2"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
              width="32"
              height="32"
            />
            Conectar com MetaMask
          </button>

          {error && <p className="message">{error.message}</p>}
        </div>

      </div>
    </div>
  )
}

export default Login
