import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.png';
import back from '../images/back.svg';
import eco1 from '../images/eco1.jpg';
import eco2 from '../images/eco2.jpg';
import eco3 from '../images/eco3.jpg';
import eco4 from '../images/eco4.jpg';
import eco5 from '../images/eco5.jpg';
import eco6 from '../images/eco6.jpg';
import './List.css';

const List = (props) => {
    // const [searchResult, setSearchResult] = useState({
    //     searchState: '',
    //     searchCity: ''
    // })
    const [ecoPoint, setEcoPoint] = useState([]);
    const [category, setCategory] = useState('');
    const [hasEcoPoint, setHasEcoPoint] = useState(false);
    const [image, setImage] = useState([eco1, eco2, eco3, eco4, eco5, eco6]);

    useEffect(() => {
        async function fetchData() {           

            const ecoData = await JSON.parse(localStorage.getItem('result'));
            
            if(ecoData.length !== 0){
                setHasEcoPoint(true);
            }
            
            setEcoPoint(ecoData);
        }
        fetchData();        
    }, []);    

    return (
        <div className='list-container'>
            <div className='list-background' />

            <header className='list-header'>
                <img src={logo} alt='logo' className='list-logo' />

                <Link to='/' className='list-link'>
                    <img src={back} alt='back' className='list-arrow' />
                    Voltar pra home
                </Link>

                <Link to='/' className='list-link-mobile'>
                    <img src={back} alt='back' className='list-arrow' />
                </Link>
            </header>

            <section className='list-box'>
                <p className='list-found'>
                    <strong>{hasEcoPoint ? (`${ecoPoint.length} ${ecoPoint.length > 1 ? 'pontos' : 'ponto'}`) : (`0 pontos`)}</strong> {`${ecoPoint.length > 1 ? 'encontrados' : 'encontrado'}`}
                </p>

                <div className='list-wrapper'>
                    {hasEcoPoint === true ? (
                        ecoPoint.map((data, key) => (
                            <div className='list-result' key={key}>
                                <img src={image[Math.floor(Math.random() * 6)]} alt='eco' className='list-result-image' />
                                <h1 className='list-result-title'>{data.name}</h1>
                                <h4 className='list-result-categ'>{data.categ.join(', ')}</h4>
                                <p className='list-result-location'>
                                    {`${data.city}, ${data.state}`} <br />
                                    {data.address} <br />
                                    {`N° ${data.number}`}
                                </p>
                            </div>
                        ))
                    ) : (
                        <h1>não tem</h1>
                    )}
                    {/* <div className='list-result'>
                        <img src={eco1} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Colectoria</h1>

                        <h4 className='list-result-categ'>Residuos Eletrônicos, Lâmpadas</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div>
                    <div className='list-result'>
                        <img src={eco2} alt='eco' className='list-result-image' />

                        <h1 className='list-result-title'>Paperside</h1>

                        <h4 className='list-result-categ'>Papéis e papelão</h4>

                        <p className='list-result-location'>
                            Rio do Sul, Santa Catarina <br />
                            Guilherme Gemballa, Jardim América <br />
                            Nº 260
                        </p>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default List;
