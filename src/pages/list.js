import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './list.css';

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
      setDigimon((prevDigimon) => {
        const newDigimon = data.content.filter(
          (digi) => !prevDigimon.some((existingDigi) => existingDigi.id === digi.id)
        );
        return [...prevDigimon, ...newDigimon];
      });
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
    <div className='container'>
      <h1>Digimons</h1>
      <ul className="card-container">
        {digimon.map((digi) => (
          <li key={digi.id} className="card">
            <img src={digi.image} alt={digi.name} />
            <h3>{digi.name}</h3>
            <button onClick={() => navigate(`/list-detail/${digi.id}`)}>
              Ver mais
            </button>
          </li>
        ))}
      </ul>
      {currentPage < totalPages - 1 && (
        <div className="load-more-container">
          <button
            className='load-more-button'
            onClick={() => fetchDigimon(currentPage + 1)}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Carregar Mais'}
          </button>
        </div>
      )}
    </div>
  );
}

export default List;
