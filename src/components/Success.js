import React from 'react';
import check from '../images/check.png';
import './Success.css';

const Success = () => {
    return (
        <div className='success-container'>
            <div className='success-box'>
                <img className='success-check' src={check} alt='checked' />

                <h1 className='success-title'>Cadastro concluído!</h1>
            </div>
        </div>
    );
};

export default Success;
