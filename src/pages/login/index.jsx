import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import RegisterPage from '../register';
// import './style.css'; // Criar e importar CSS depois

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Chama a função signIn do AuthContext, que usa o supabaseClient configurado
      const { error } = await signIn({ email, password });
      
      if (error) throw error;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    return RegisterPage();
  }

  return (
    <div> {/* TODO: Aplicar estilos do Figma */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {/* Removido qualquer referência a Captcha */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading || !email || !password}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Não tem uma conta? <button onClick={handleRegister()}>Registre-se</button>
      </p>
    </div>
  );
}

export default LoginPage;

