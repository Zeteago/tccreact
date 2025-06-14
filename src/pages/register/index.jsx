import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Phone } from '@mui/icons-material';
import { supabase } from '../../supabaseClient';
// import './style.css'; // Criar e importar CSS depois

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState(''); // Campo adicional para nome
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await signUp({ 
        email, 
        password, 
        options: { 
          data: { 
            Nome: nome,
          } 
        }
      });
      if (error) throw error;

      // Só cria na tb_cliente se o usuário foi criado com sucesso
      const userId = data?.user?.id;
      if (userId) {
        const { error: insertError } = await supabase
          .from('tb_cliente')
          .insert([{
            id_Auth: userId,
            Nome: nome,
            Endereco: endereco,
            Telefone: telefone,
            Seguindo: [],
            historico: [],
          }]);
        if (insertError) throw insertError;
      }
    } catch (error) {
      setError(error.message);
      console.error("Erro ao registrar:", error);
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
          <label htmlFor="telefone">Telefone:</label>
          <input
            id="telefone"
            type="tel"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="endereco">Endereço:</label>
          <input
            id="endereco"
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
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

