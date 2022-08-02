import React, { useState, useEffect } from 'react';
import logo from '../images/Logo.png';
import people from '../images/People.png';
import background from '../images/Background.png';
import arrow from '../images/arrow.svg';
import Search from './Search';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { IconContext } from 'react-icons';
import './Home.css';

const Home = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isClicked]);

  const handleSearch = () => {
    setIsClicked(true);
    window.scrollTo(0, 0);
  };

  return (
    <IconContext.Provider value={{ size: '1.5rem', color: '#fff' }}>
      {isClicked && <Search setIsClicked={setIsClicked} />}
      <div className='home-container'>
        <img src={background} alt='background' className='home-background' />

        <header className='home-header'>
          <img src={logo} alt='logo' className='home-logo' />

          <Link to='/register' className='home-link'>
            <img src={arrow} alt='arrow' className='home-arrow' />
            Cadastre um ponto de coleta
          </Link>

          <Link to='/register' className='home-link-mobile'>
            <img src={arrow} alt='arrow' className='home-arrow' />
          </Link>
        </header>

        <main className='home-wrapper'>
          <div className='home-info'>
            <h1 className='home-info-title'>Seu marketplace de coleta de resíduos.</h1>

            <p className='home-info-desc'>
              Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
            </p>

            <div className='home-info-btn' onClick={handleSearch}>
              <div className='home-info-btn-f-half'>
                <FiSearch />
              </div>
              <div className='home-info-btn-l-half'>Pesquisar pontos de coleta</div>
            </div>
          </div>
          <div className='home-image'>
            <img src={people} alt='people' className='home-image-people' />
          </div>
        </main>
      </div>
    </IconContext.Provider>
  );
};

export default Home;
