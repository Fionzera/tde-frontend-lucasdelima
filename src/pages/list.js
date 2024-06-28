import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function List() {
  const [digimon, setDigimon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const fetchDigimon = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(`https://digi-api.com/api/v1/digimon?page=${page}`);
      const data = await response.json();
      setDigimon((prevDigimon) => [...prevDigimon, ...data.content]);
      setCurrentPage(data.pageable.currentPage);
      setTotalPages(data.pageable.totalPages);
    } catch (error) {
      setError('Erro ao carregar. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDigimon(0);
  }, []);

  if (loading && currentPage === 0) {
    return <p>Digievoluindo...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Digimons</h2>
      <ul>
        {digimon.map((digi) => (
          <li key={digi.id}>
            <img src={digi.image} alt={digi.name} />
            <h3>{digi.name}</h3>
            <button onClick={() => navigate(`/list-detail/${digi.id}`)}>
              Detalhes
            </button>
          </li>
        ))}
      </ul>
      {currentPage < totalPages - 1 && (
        <button onClick={() => fetchDigimon(currentPage + 1)} disabled={loading}>
          {loading ? 'Carregando...' : 'Carregar Mais'}
        </button>
      )}
    </div>
  );
}

export default List;
