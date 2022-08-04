import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './Search.css';
import Data from '../Data.json';

const Search = (props) => {
  const [isFilteredState, setIsFilteredState] = useState('');
  const [data, setData] = useState([]);
  const [searchError, setSearchError] = useState({
    errorState: false,
    errorCity: false
  })
  const stateInput = useRef();
  const cityInput = useRef();
  
  const estadoFilter = isFilteredState !== '' ? Data.estados.filter((state) => state.nome.includes(stateInput.current.value)) : [];
  console.log(estadoFilter)

  const navigate = useNavigate();

  const handleClose = () => {
    props.setIsClicked(false);
  };

  useEffect(() => {
    async function fetchData() {
      const dataFetch = await JSON.parse(localStorage.getItem('ecoPoint')) || [];
      setData(dataFetch);
    }
    fetchData();
  }, []);   

  const onSearch = (e) => {
    e.preventDefault();
    if(stateInput.current.value !== '' && cityInput.current.value !== ''){
      setSearchError({ errorState: false, errorCity: false });    
      
      const searchDataSave = {
        searchState: stateInput.current.value,
        searchCity: cityInput.current.value
      };

      localStorage.setItem('searchData', JSON.stringify(searchDataSave));
      const resultData = data.filter(result => result.city === searchDataSave.searchCity);
      localStorage.removeItem('result');
      localStorage.setItem('result', JSON.stringify(resultData));
      navigate('/list');
    } else {
      if(stateInput.current.value === ''){
        setSearchError({ ...searchError, errorState: true });
      }

      if(cityInput.current.value === ''){
        setSearchError({ ...searchError, errorCity: true });
      }
    }
  };

  return (
    <IconContext.Provider value={{ size: '2rem', color: 'white' }}>
      <div className='search-container' >
        <AiOutlineClose className='search-close' onClick={handleClose} />
        <h1 className='search-title'>Pontos de coleta</h1>

        <form className='search-form'>
          <div className='search-state'>
            <small className='search-small'>Estado</small>
            <select name='state' className={searchError.errorState ? 'search-select-state error-search' : 'search-select-state'} onChange={e => setIsFilteredState(e.target.value)} ref={stateInput}>
              {Data.estados.map((state, key) => (
                <option key={key} value={state.nome} className='data-result-state-item'>{state.nome}</option>
              ))}
            </select>            
          </div>

          <div className='search-city'>
            <small className='search-small'>Cidade</small>
            <select name='city' className={searchError.errorCity ? 'search-select-city error-search' : 'search-select-city'} ref={cityInput}>
              {
                isFilteredState !== '' ? (
                  estadoFilter[0].cidades.map((city, key) => (
                    <option key={key} value={city} className='data-result-city-item'>{city}</option>
                  ))
                ) : (
                  null
                )
              }
            </select>            
          </div>
          <button className='search-btn' onClick={onSearch}>
            Buscar
          </button>
        </form>
      </div>
    </IconContext.Provider>
  );
};

export default Search;
