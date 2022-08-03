import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Success from './Success';
import validate from '../validate';
import logo from '../images/Logo.png';
import back from '../images/back.svg';
import lamp from '../images/Lampadas.png';
import battery from '../images/Baterias.png';
import papers from '../images/Papéis e Papelão.png';
import electronics from '../images/Eletrônicos.png';
import organics from '../images/Organicos.png';
import oil from '../images/Óleo.png';
import './Register.css';
import Data from '../Data.json';

const Register = () => {
  const [successful, setSuccessful] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState({
    name: '',
    address: '',
    number: '',
    city: '',
    state: '',
    categ: []
  });
  const [isClicked, setIsClicked] = useState({
    'Lâmpadas': false,
    'Pilhas e Baterias': false,
    'Papéis e Papelão': false,
    'Resíduos Eletrônicos': false,
    'Resíduos Orgânicos': false,
    'Óleo de Cozinha': false
  });
  const [isFilteredState, setIsFilteredState] = useState([]);
  const [isFilteredCity, setIsFilteredCity] = useState([]);

  const stateInputRegister = useRef();
  const cityInputRegister = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      const saveData = JSON.parse(localStorage.getItem('ecoPoint')) || [];
      saveData.push(data);
      localStorage.setItem('ecoPoint', JSON.stringify(saveData));
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
      setSuccessful(true);
      setTimeout(() => {
        document.body.style.overflow = 'auto';
        navigate('/');
      }, 3000)
    }
  }, [error]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

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
      setIsFilteredState(newFilter);
    } else {
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
          stateInputRegister.current.value
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
      setIsFilteredCity(newFilter);
    } else {
      setIsFilteredCity([]);
    }
  };  

  const handleSelect = (element) => {
    switch (element) {
      case 'lamp':
        setIsClicked({ ...isClicked, 'Lâmpadas': !isClicked['Lâmpadas'] });
        break;
      case 'battery':
        setIsClicked({ ...isClicked, 'Pilhas e Baterias': !isClicked['Pilhas e Baterias'] });
        break;
      case 'paper':
        setIsClicked({ ...isClicked, 'Papéis e Papelão': !isClicked['Papéis e Papelão'] });
        break;
      case 'electronic':
        setIsClicked({ ...isClicked, 'Resíduos Eletrônicos': !isClicked['Resíduos Eletrônicos'] });
        break;
      case 'organic':
        setIsClicked({ ...isClicked, 'Resíduos Orgânicos': !isClicked['Resíduos Orgânicos'] });
        break;
      case 'oil':
        setIsClicked({ ...isClicked, 'Óleo de Cozinha': !isClicked['Óleo de Cozinha'] });
        break;
      default:
        return;
    }
  };

  const onBlurResults = () => {
    setTimeout(() => {
      setIsFilteredState([]);
      setIsFilteredCity([]);
    }, 500);
  };

  const onChangeInputValueState = (e) => {    
    const resultValue = e.target.textContent;
    stateInputRegister.current.value = resultValue;
    setData({ ...data, state: resultValue });
  };

  const onChangeInputValueCity = (e) => {
    const resultValue = e.target.textContent;
    cityInputRegister.current.value = resultValue;
    setData({...data, city: resultValue});
  };

  const handleSubmit = () => {
    console.log('clicado');
    let newElements = Object.entries(isClicked);
    newElements = newElements.filter(([key, value]) => value === true).map(([key, value]) => key);
    data.categ = newElements;
    setError(validate(data, isClicked));
    setIsSubmit(true);
  };  

  return (
    <>
      {successful && <Success />}
      <div className='register-container' onBlur={onBlurResults}>
        <header className='register-header'>
          <img src={logo} alt='logo' className='register-logo' />

          <Link to='/' className='register-link'>
            <img src={back} alt='arrow' className='register-arrow' />
            Voltar pra home
          </Link>

          <Link to='/' className='register-link-mobile'>
            <img src={back} alt='arrow' className='register-arrow' />
          </Link>
        </header>

        <section className='register-box' >
          <h1 className='register-box-title'>Cadastro do ponto de coleta</h1>

          <h4 className='register-box-subtitle'>Dados da entidade</h4>

          <form className='register-box-form' autoComplete='off'>
            <div className='register-box-name'>
              <small className='register-box-small'>Nome da entidade</small>
              <input
                type='text'
                name='name'
                value={data.name}
                className={error.name ? 'register-box-input-name error' : 'register-box-input-name'}
                onChange={onInputChange}
              />
              <small className='error-small'>{error.name}</small>
            </div>

            <div className='register-box-input-wrapper'>
              <div className='register-box-address'>
                <small className='register-box-small'>Endereço</small>
                <input
                  type='text'
                  name='address'
                  value={data.address}
                  className={
                    error.address
                      ? 'register-box-input-address error'
                      : 'register-box-input-address'
                  }
                  onChange={onInputChange}
                />
                <small className='error-small'>{error.address}</small>
              </div>

              <div className='register-box-number'>
                <small className='register-box-small'>Número</small>
                <input
                  type='text'
                  name='number'
                  value={data.number}
                  className={
                    error.number ? 'register-box-input-number error' : 'register-box-input-number'
                  }
                  onChange={onInputChange}
                />
                <small className='error-small'>{error.number}</small>
              </div>
            </div>

            <div className='register-box-input-wrapper'>
              <div className='register-box-state'>
                <small className='register-box-small'>Estado</small>
                <input
                  type='text'
                  name='state'
                  className={
                    error.state ? 'register-box-input-state error' : 'register-box-input-state'
                  }
                  onChange={changeBorderState}                  
                  ref={stateInputRegister}
                />
                {isFilteredState.length !== 0 && (
                  <div className='state-sugestion'>
                    {isFilteredState.slice(0, 15).map((value, key) => {
                      return (
                        <div
                        className='state-sugestion-item'
                        onClick={onChangeInputValueState}
                        key={key}
                        >
                          {value.nome}
                        </div>
                      );
                    })}
                  </div>
                )}
                <small className='error-small'>{error.state}</small>
              </div>

              <div className='register-box-city'>
                <small className='register-box-small'>Cidade</small>
                <input
                  type='text'
                  name='city'
                  className={
                    error.city ? 'register-box-input-city error' : 'register-box-input-city'
                  }
                  onChange={changeBorderCity}
                  ref={cityInputRegister}
                />                
                <div className='city-sugestion'>
                  {isFilteredCity.slice(0, 15).map((value, key) => {
                    return (
                      <div
                      className='city-sugestion-item'
                      onClick={onChangeInputValueCity}
                      key={key}
                      >
                        {value}
                      </div>
                    )
                  })}                 
                </div>
                <small className='error-small'>{error.city}</small>
              </div>
            </div>            
          </form>

          <div className='register-items-wrapper'>
            <div className='register-items-info'>
              <h4 className='register-items-title'>Ítens de coleta</h4>

              <p className={error.categ ? 'register-items-desc error-desc' : 'register-items-desc'}>
                Selecione um ou mais ítens abaixo
              </p>
            </div>
            <div className='register-items-selectables'>
              <div
                className={isClicked['Lâmpadas'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('lamp')}
              >
                <img className='register-item-img' src={lamp} alt='lampadas' />
                <h4 className='register-item-title'>Lâmpadas</h4>
              </div>
              <div
                className={isClicked['Pilhas e Baterias'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('battery')}
              >
                <img className='register-item-img' src={battery} alt='pilhas e baterias' />
                <h4 className='register-item-title'>Pilhas e Baterias</h4>
              </div>
              <div
                className={isClicked['Papéis e Papelão'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('paper')}
              >
                <img className='register-item-img' src={papers} alt='papéis e papelão' />
                <h4 className='register-item-title'>Papéis e Papelão</h4>
              </div>
              <div
                className={isClicked['Resíduos Eletrônicos'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('electronic')}
              >
                <img className='register-item-img' src={electronics} alt='resíduos eletrônicos' />
                <h4 className='register-item-title'>Resíduos Eletrônicos</h4>
              </div>
              <div
                className={isClicked['Resíduos Orgânicos'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('organic')}
              >
                <img className='register-item-img' src={organics} alt='resíduos orgânicos' />
                <h4 className='register-item-title'>Resíduos Orgânicos</h4>
              </div>
              <div
                className={isClicked['Óleo de Cozinha'] ? 'register-item selected' : 'register-item'}
                onClick={() => handleSelect('oil')}
              >
                <img className='register-item-img' src={oil} alt='óleo de cozinha' />
                <h4 className='register-item-title'>Óleo de Cozinha</h4>
              </div>
            </div>
          </div>

          <div className='register-btn-box'>
            <button className='register-btn' onClick={handleSubmit}>
              Cadastrar ponto de coleta
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

export default Register;
