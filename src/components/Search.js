import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import './Search.css';
import Data from '../Data.json';

const Search = (props) => {
  const [bordersState, setBordersState] = useState(false);
  const [bordersCity, setBordersCity] = useState(false);
  const [isFilteredState, setIsFilteredState] = useState([]);
  const [isFilteredCity, setIsFilteredCity] = useState([]);
  const [data, setData] = useState([]);
  const [searchError, setSearchError] = useState({
    errorState: '',
    errorCity: ''
  })
  const stateInput = useRef();
  const cityInput = useRef();

  const navigate = useNavigate();

  const handleClose = () => {
    props.setIsClicked(false);
  };

  useEffect(() => {
    async function fetchData() {
      const dataFetch = await JSON.parse(localStorage.getItem('ecoPoint'));
      setData(dataFetch);     
      console.log(dataFetch);
    }
    fetchData();
  }, [])

  const changeBorderState = (e) => {
    const searchWord = e.target.value;
    const newFilter = Data.estados.filter((value) => {
      return value.nome
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .includes(
          searchWord
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
        );
    });

    if (searchWord !== '') {
      setBordersState(true);
      setIsFilteredState(newFilter);
    } else {
      setBordersState(false);
      setIsFilteredState([]);
    }
  };

  const changeBorderCity = (e) => {
    const searchWord = e.target.value;
    const estado = Data.estados.filter((value) =>
      value.nome
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .includes(
          stateInput.current.value
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
        )
    );
    const newFilter = estado[0].cidades.filter((value) =>
      value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .includes(
          searchWord
            .normalize('NFD')
            .replace(/\p{Diacritic}/gu, '')
            .toLowerCase()
        )
    );

    if (e.target.value !== '') {
      setBordersCity(true);
      setIsFilteredCity(newFilter);
    } else {
      setBordersCity(false);
      setIsFilteredCity([]);
    }
  };

  const onBlurResults = () => {
    setBordersState(false);
    setIsFilteredState([]);

    setBordersCity(false);
    setIsFilteredCity([]);
  };

  const onChangeInputValueState = (e) => {
    const resultValue = e.target.textContent;
    stateInput.current.value = resultValue;
  };

  const onChangeInputValueCity = (e) => {
    const resultValue = e.target.textContent;
    cityInput.current.value = resultValue;
  };

  const onSearch = (e) => {
    e.preventDefault();
    if(stateInput.current.value.length > 2 && cityInput.current.value.length > 2){      
      searchError.errorState = '';
      searchError.errorCity = '';
      stateInput.current.style.border = 'none';
      cityInput.current.style.border = 'none';
      
      const searchDataSave = {
        searchState: stateInput.current.value,
        searchCity: cityInput.current.value
      };

      localStorage.setItem('searchData', JSON.stringify(searchDataSave));
      const resultData = data.filter(result => result.city.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase() === searchDataSave.searchCity.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase());
      localStorage.removeItem('result');
      localStorage.setItem('result', JSON.stringify(resultData));
      navigate('/list');
    } else {
      searchError.errorState = 'Estado Invalido! Insira sem abreviação.';
      searchError.errorCity = 'Cidade Invalida! Insira sem abreviação.';
      stateInput.current.style.border = '2px solid red';
      cityInput.current.style.border = '2px solid red';
      stateInput.current.value = '';
      cityInput.current.value = '';
    }
  };

  return (
    <IconContext.Provider value={{ size: '2rem', color: 'white' }}>
      <div className='search-container' onClick={onBlurResults}>
        <AiOutlineClose className='search-close' onClick={handleClose} />
        <h1 className='search-title'>Pontos de coleta</h1>

        <form className='search-form'>
          <div className='search-state'>
            {searchError.errorState && <small className='search-error-small'>{searchError.errorState}</small>}
            <input
              type='text'
              className={bordersState ? 'search-input-state borders' : 'search-input-state'}
              placeholder='Digite a estado'
              onChange={changeBorderState}
              ref={stateInput}
            />
            {isFilteredState.length !== 0 && (
              <div className='data-result-state'>
                {isFilteredState.slice(0, 15).map((value, key) => {
                  return (
                    <div
                      className='data-result-state-item'
                      onClick={onChangeInputValueState}
                      key={key}
                    >
                      {value.nome}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className='search-city'>
            {searchError.errorCity && <small className='search-error-small'>{searchError.errorCity}</small>}
            <input
              type='text'
              className={bordersCity ? 'search-input-city borders' : 'search-input-city'}
              placeholder='Digite o cidade'
              onChange={changeBorderCity}
              ref={cityInput}
              />
            {isFilteredCity.length !== 0 && (
              <div className='data-result-city'>
                {isFilteredCity.slice(0, 15).map((value, key) => {
                  return (
                    <div className='data-result-city-item' onClick={onChangeInputValueCity} key={key}>
                      {value}
                    </div>
                  );
                })}
              </div>
            )}
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
