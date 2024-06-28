import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/button';

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
    <div>
      {digimon && (
        <>
          <h2>{digimon.name}</h2>
          <img src={digimon.images[0].href} alt={digimon.name} />
          <p><strong>Nível:</strong> {digimon.levels[0].level}</p>
          <p><strong>Tipo:</strong> {digimon.types[0].type}</p>
          <p><strong>Atributo:</strong> {digimon.attributes[0].attribute}</p>
          <p><strong>Tem X-Antibody:</strong> {digimon.xAntibody ? 'Sim' : 'Não'}</p>
        </>
      )}
        <Button onClick={() => navigate(`/list`)} text={"Votar"}/>
    </div>
  );
}

export default ListDetail;
