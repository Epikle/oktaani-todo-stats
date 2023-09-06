import { Form } from './components/Form';
import { useTokenStore } from './stores/useTokenStore';

import './globals.css';

function App() {
  const token = useTokenStore((state) => state.token);

  return (
    <>
      <main className="min-h-screen grid place-content-center">
        {token ? <p>{token}</p> : <Form />}
      </main>
    </>
  );
}

export default App;
