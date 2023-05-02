import logo from './logo.svg';
import './App.css';
import CustomeRouter from './routes';
import useInitialize from './auth/chat/connection';
import { useConnectServer } from './auth/chat/connectServer';
import { useQuery } from 'react-query';

function App() {
    useInitialize();
    useConnectServer();

  return (
    <div className="App">
      <CustomeRouter  />
    </div>
  );
}

export default App;
