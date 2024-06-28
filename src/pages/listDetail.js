import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/button';
import './listDetail.css';

function ListDetail() {
  const { id } = useParams();
  const [digimon, setDigimon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDigimonDetail = async () => {
      try {
        const response = await fetch(`https://digi-api.com/api/v1/digimon/${id}`);
        const data = await response.json();
        setDigimon(data);
      } catch (error) {
        setError('Erro ao carregar. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchDigimonDetail();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="detail-container">
      {digimon && (
        <>
          <div className="detail-image">
            <img src={digimon.images?.[0]?.href || 'path/to/placeholder-image.png'} alt={digimon.name || 'Desconhecido'} />
          </div>
          <div className="detail-info">
            <h2>{digimon.name || 'Desconhecido'}</h2>
            <p><strong>Nível:</strong> {digimon.levels?.[0]?.level || 'Desconhecido'}</p>
            <p><strong>Tipo:</strong> {digimon.types?.[0]?.type || 'Desconhecido'}</p>
            <p><strong>Atributo:</strong> {digimon.attributes?.[0]?.attribute || 'Desconhecido'}</p>
            <p><strong>Tem X-Antibody:</strong> {digimon.xAntibody ? 'Sim' : 'Não'}</p>
            <p><strong>Ano de Lançamento:</strong> {digimon.releaseDate || 'Desconhecido'}</p>
            {digimon.descriptions && digimon.descriptions.length > 0 ? (
              digimon.descriptions.map((description, index) => (
                <p key={index}><strong>Descrição:</strong> {description.description || 'Desconhecido'}</p>
              ))
            ) : (
              <p><strong>Descrição:</strong> Desconhecido</p>
            )}
            <Button onClick={() => navigate(`/list`)} text={"Voltar"}/>
          </div>
        </>
      )}
    </div>
  );
}

export default ListDetail;
