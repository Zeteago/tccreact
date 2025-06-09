import './stylePerfilUsu.css'
import React, { useState, useEffect } from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';

import { useAuth } from '../AuthContext';
import { supabase } from '../supabaseClient';

import ImgPadrao from '../assets/app/fundo.jpg'

import LoginPage from '../pages/login';

function PerfilUsuario({ trocarAba }) {
  const { user, signOut } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Campos editáveis
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  // Adicionar outros campos editáveis conforme necessário

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        setError('Usuário não autenticado.');
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('tb_cliente')
          .select('*')
          .eq('id_Auth', user.id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Perfil não encontrado.');

        setProfileData(data);
        // Preencher campos do formulário
        setNome(data.Nome || '');
        setEndereco(data.Endereco || '');
        setTelefone(data.Telefone || '');

      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
        setError(`Falha ao carregar perfil: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Atualizar dados na tb_cliente
      const { error: updateError } = await supabase
        .from('tb_cliente')
        .update({ 
            Nome: nome,
            Endereco: endereco,
            Telefone: telefone,
            // Adicionar outros campos atualizados
         })
        .eq('id_Auth', user.id);

      if (updateError) throw updateError;

      // Atualizar estado local e sair do modo de edição
      setProfileData(prev => ({ ...prev, Nome: nome, Endereco: endereco, Telefone: telefone }));
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');

    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      setError(`Falha ao atualizar perfil: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando perfil...</div>;
  }

  if (error) {
    alert('deu erro: ', error)
    return <LoginPage />
  }

  if (!profileData) {
    return <LoginPage />
  } else {

  return (
    // Aplicar a classe container principal
    <div className="profile-container"> 
      <h2>Perfil do Usuário</h2>
      {isEditing ? (
        <form onSubmit={handleUpdateProfile}>
          <div>
            <label htmlFor="nome">Nome:</label>
            <input id="nome" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            {/* Usar span estilizado para campo não editável */}
            <input id="email" type="email" value={user.email} disabled />
          </div>
           <div>
            <label htmlFor="endereco">Endereço:</label>
            <input id="endereco" type="text"  />
          </div>
           <div>
            <label htmlFor="telefone">Telefone:</label>
            <input id="telefone" type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          {/* Adicionar outros campos editáveis */} 
          <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Alterações'}</button>
          <button type="button" onClick={() => setIsEditing(false)} disabled={loading}>Cancelar</button>
        </form>
      ) : (
        // Usar uma div para agrupar os dados exibidos
        <div className="profile-display">
          <div><p><strong>Nome:</strong> {profileData.Nome}</p></div>
          <div><p><strong>Email:</strong> {user.email}</p></div>
          <div><p><strong>Endereço:</strong> {profileData.Endereco || 'Não informado'}</p></div>
          <div><p><strong>Telefone:</strong> {profileData.Telefone || 'Não informado'}</p></div>
          {/* Exibir outros campos */} 
          <button onClick={() => setIsEditing(true)}>Editar Perfil</button>
        </div>
      )}

      <hr />
      {/* TODO: Implementar seção "Lojas Seguidas" buscando de profileData.Seguindo */}
      {/* <h3>Lojas Seguidas</h3>
      Idealmente, isso seria uma lista de links/cards para as lojas */}
      {/* <div className="followed-stores-list">
        {profileData.Seguindo ? (
            profileData.Seguindo.split(',').map(id => <p key={id}>ID Loja: {id.trim()}</p>) // Exemplo simples
        ) : (
            <p>Você ainda não segue nenhuma loja.</p>
        )}
      </div> */}

      {/*<hr />
       TODO: Implementar seção "Favoritos" buscando de tb_favoritos 
      <h3>Favoritos</h3>
      <div className="favorites-list">
        <p>Funcionalidade de favoritos ainda não implementada nesta tela.</p>
        Mapear e exibir produtos favoritos aqui 
      </div>

      <hr />*/}
      <button onClick={signOut} disabled={loading}>Sair (Logout)</button>
    </div>
  );
}
}

export default PerfilUsuario