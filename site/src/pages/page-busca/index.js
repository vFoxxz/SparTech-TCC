import './index.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { listarPorNome, listarTodosProfissionais, buscarImagem } from '../../api/profissionalApi';
import storage from 'local-storage'

export default function Busca() {


    const [profissional, setProfissional] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');

    const navigate = useNavigate()

    async function carregarTodosProfissionais() {
        const resposta = await listarTodosProfissionais();
        setProfissional(resposta);

    }
    useEffect(() => {
        carregarTodosProfissionais();
    }, []);

    async function filtrarPorNome() {
        if (storage('Categoria')) {
            const catLP = storage('Categoria').categoria
            setFiltroNome(catLP)
            storage.remove('Categoria')
        }
        else {
            const resposta = await listarPorNome(filtroNome);
            setProfissional(resposta);
        }

    }

    useEffect(() => {
        filtrarPorNome()
    }, [filtroNome]);

    function sairClick() {
        navigate('/')
    }


    return (
        <main className='Busca-prof'>

            <header className="barra">


                <div>
                    <img className='logo' src='/assets/images/teste final 1.png' onClick={sairClick} />
                </div>

                <div className='buscar'>
                    <input placeholder='Digite o serviço que busca' type='text' value={filtroNome} onChange={e => setFiltroNome(e.target.value)} />

                    <img className='jobseeker' src='/assets/images/Job Seeker.png' onClick={filtrarPorNome} />
                </div>

                <div className='a'>
                    <a href='/login'>
                        <img className='logo-spartan' src='/assets/images/spartan 5.png' />
                    </a>

                    <div className='voltar' onClick={sairClick}>
                        <img className='logo-menu' src='/assets/images/voltar.png' />
                        <p>voltar</p>
                    </div>

                </div>

            </header>





            <div className='resultado'>
                {profissional.map(item =>



                    <div className='CardProf' onClick={() => [navigate(`/perfil-profissional/${item.id}`)]}>

                        <img className="foto" src={buscarImagem(item.foto)} />
                        <div className='info'>

                            <h4 className="nome">{item.nome}</h4>
                            <h6 className="servico">{item.serviço}</h6>
                            <div className='avaliacao'>

                                <img className='estrela' src='/assets/images/estrela.png' />
                                <img className='estrela' src='/assets/images/estrela.png' />
                                <img className='estrela' src='/assets/images/estrela.png' />
                                <img className='estrela' src='/assets/images/estrela.png' />
                                <img className='estrela' src='/assets/images/estrela.png' />

                                <div className='numero-avaliacao'> {item.avaliacao} </div>
                            </div>
                            
                            {item.destaque &&
                                <div className='div-destaque'>
                                    <img className='estrela-destaque' src='/assets/images/destaque.png' />
                                    <div className='destaque'>destaque espartech</div>
                                </div>
                            }
                            {!item.destaque

                            }


                        </div>
                    </div>

                )}

            </div>


        </main>
    );

}