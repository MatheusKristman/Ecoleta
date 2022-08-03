import React from 'react';
import {useNavigate} from 'react-router-dom';
import notFoundPage from '../images/not-found-page.png';
import logo from '../images/Logo.png';
import background from '../images/Background.png';
import './NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  function goHome() {
    navigate('/');
  }

  return (
    <div className='nf-container'>
      <img src={background} alt='background' className='nf-background-image' />
      <header className='nf-header'>
        <img src={logo} alt='logo' className='nf-logo' />
      </header>
      <section className='nf-info'>
        <div className='nf-box'>
          <img src={notFoundPage} alt='not found' className='nf-image' />
          <h1 className='nf-title'>404</h1>
          <h4 className='nf-desc'>pagina não encontrada</h4>
          <button onClick={goHome} className='nf-btn'>Retornar para a página inicial</button>
        </div>
      </section>      
    </div>
  )
}

export default NotFound