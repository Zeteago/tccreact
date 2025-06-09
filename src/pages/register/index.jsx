import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
// import './style.css'; // Criar e importar CSS depois

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState(''); // Campo adicional para nome
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Incluir o nome nos 'options.data' para ser salvo na tb_cliente
      const { error } = await signUp({ 
        email, 
        password, 
        options: { 
          data: { 
            Nome: nome 
            // Adicionar outros campos iniciais se necessário (ex: Endereco, Telefone vazios)
          } 
        }
      });
      if (error) throw error;
    } catch (error) {
      setError(error.message);
      console.error("Erro ao registrar:", error); // Logar o erro para depuração
    } finally {
      setLoading(false);
    }
  };

  return (
    <div> {/* TODO: Aplicar estilos do Figma */}
      <h2>Registro de Cliente</h2>
      <form onSubmit={handleRegister}>
         <div>
          <label htmlFor="nome">Nome Completo:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
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
            minLength="6" // Supabase exige mínimo de 6 caracteres por padrão
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
      {/* TODO: Adicionar link para Login */}
    </div>
  );
}

export default RegisterPage;

