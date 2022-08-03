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
import notfoundImage from '../images/notfound.png';
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
        document.body.style.overflow = 'auto';
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

                <div className={hasEcoPoint ? 'list-wrapper' : 'list-wrapper nf'}>
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
                        <div className='notfound-result'>
                            <img src={notfoundImage} alt='not found' className='notfound-image' />
                            <h1 className='notfound-title'>nenhum ponto de coleta encontrado</h1>
                        </div>
                    )}                    
                </div>
            </section>
        </div>
    );
};

export default List;
