import { useConnection } from 'wagmi'
import Login from './Login';
import Vote from './Vote';


export default function App() {

  const conennection = useConnection()

  return (
    <>
    {
      conennection.status === 'connected' ? <Vote/>:<Login/>
    }
    </>
  )
}
