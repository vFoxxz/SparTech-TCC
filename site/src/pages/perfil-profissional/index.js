import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { mostrarComentarios, MostrarPerfil, buscarImagem, inserirComentario } from '../../api/profissionalApi';
import storage from 'local-storage'
import Modal from 'react-modal'
import Editar from '../../components/editar-perfil'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Denunciar from '../../components/denuciar-perfil';
import ReactModal from 'react-modal';

export default function Perfilprofissional() {

    const [perfil, setPerfil] = useState([])
    const [comentario, setComentario] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const [ModalIsOpen, SetIsOpen] = useState(false);
    const [comentar, setComentar] = useState('')


    const { idParam } = useParams();


    const navigate = useNavigate()


    function home() {
        navigate('/')
    }
    useEffect(() => {
        if (idParam) {
            carregarPerfil();
        }

    }, [])

    async function carregarPerfil() {
        const resposta = await MostrarPerfil(idParam);
        setPerfil(resposta)
    }


    async function carregarTodosComentarios() {
        const resposta = await mostrarComentarios();
        setComentario(resposta);
    }
    useEffect(() => {
        carregarTodosComentarios()
    }, [])


    function sairClick() {
        storage.remove('profissional-logado')
        storage.remove('cliente-logado')
        navigate('/login')
    }

    useEffect(() => {
        if (!storage('profissional-logado'), !storage('cliente-logado'), !storage('undefined')) {
            navigate('/login')
        }
    }, [])

    Modal.setAppElement('#root');

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function recarregarAPagina() {
        window.location.reload();
    }

    async function fazerComentario() {
        const IDcliente = storage('cliente-logado').id
        const resposta = await inserirComentario(IDcliente, idParam, comentar)
        setComentar('')
        toast.success('Comentário realizado!')
    }

    function NavegarParaServico() {
        navigate(`/solicitar-servico/${idParam}`)
    }

    const customStyles = {
        content: {
            display: 'flex',
            alignItens: 'center',
            justifyContent: 'center',
            border: 'none',
            margin: 'none',
            backgroundColor: '#00000000'
        },
        overlay: {
            backgroundColor: '#000000ce'
        },

    };

    function openModal() {
        SetIsOpen(true);
    }

    function closeModal() {
        SetIsOpen(false);
    }

    const Css = {
        content: {
            display: 'flex',
            alignItens: 'center',
            justifyContent: 'center',
            border: 'none',
            margin: 'none',
            backgroundColor: '#00000000'
        },
        overlay: {
            backgroundColor: '#000000ce'
        },

    };




    return (
        <main className='Perfil-Profissional'>
            <ToastContainer />

            <div className='barra'>

                <div className="voltar" onClick={sairClick}>
                    <img src='/assets/images/voltar.png' />
                    <h1>sair</h1>
                </div>

                <div className="c">
                    <img className='Logo' src='/assets/images/teste final 1.png' onClick={home} />
                </div>
                <div className="acoes" onClick={openModal}>
                    <h1 className='denunciar'>denunciar</h1>
                    <Modal
                        isOpen={ModalIsOpen}
                        onRequestClose={closeModal}
                        style={Css}
                    >

                        <img src={'/assets/images/cancelar.png'} onClick={closeModal} height={'30'} />

                        <Denunciar />



                    </Modal>
                    {storage('profissional-logado') &&
                        <h1 className='servico'>Serviços</h1>
                    }
                    {storage('cliente-logado') &&
                        <h1 className='servico' onClick={NavegarParaServico}>Contratar</h1>
                    }
                </div>


            </div>
            {perfil.map(item =>
                <div>

                    <div className='fundo'>

                        <img src={buscarImagem(item.foto)} className="foto" />

                        <img src='/assets/images/fundo.png' className="cinza" />

                    </div>

                    <div className='informacoes'>

                        <div className="op">
                            <div className="ip">

                                <h1 className='nome'>{item.nome}</h1>

                                <p className="tel">{item.telefone}</p>

                                <p className="email">{item.email}</p>


                                <div className="avaliacao">
                                    <div className="estrelas">
                                        <img src='/assets/images/estrela.png' />
                                        <img src='/assets/images/estrela.png' />
                                        <img src='/assets/images/estrela.png' />
                                        <img src='/assets/images/estrela.png' />
                                        <img src='/assets/images/estrela.png' />

                                    </div>
                                    <p>{item.avaliacao}</p>
                                </div>
                            </div>
                            <div className='editar'>
                                {storage('profissional-logado') &&
                                    <div className='botoes-perfil'>

                                        <button className='botao-refresh' onClick={recarregarAPagina}>
                                            <h1 className="perfil-refresh">atualizar informações</h1>
                                            <img class="spinner is-animating" src='/assets/images/atualizar.png' />
                                        </button>


                                        <button onClick={openModal} className="botao-editar">
                                            <h1 className="perfil">editar perfil</h1>
                                            <img className='editar-animation' src='/assets/images/caneta.png' />
                                        </button>

                                    </div>
                                }
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}

                                >

                                    <Editar />

                                    <img src={'/assets/images/cancelar.png'} alt="" height={'30'} onClick={closeModal} />


                                </Modal>



                            </div>
                        </div>
                        <hr />

                        <div className='experiencia'>

                            <div className="area-de-atuacao">
                                <h1>área(s) de atuação</h1>

                                <p>{item.area}</p>

                            </div>
                            <div className='licenca'>
                                <h1>Licenças e certificados</h1>

                                <p>{item.licenca}</p>

                            </div>
                        </div>


                    </div>
                </div>
            )}

            <div className='informacoes'>
                <hr />
                <div className="comentes">
                    {storage('profissional-logado') &&
                        <h1>comentários sobre você</h1>
                    }
                    {storage('cliente-logado') &&
                        <div>
                            <h1>avalie este profissional</h1>
                            <div className='input-comentario'>
                                <input placeholder='Digite sobre o profissional' className='inserir-comentario' type='text' value={comentar} onChange={e => setComentar(e.target.value)} />
                                <img className='enviar-comentario' id='send' src={'/assets/images/enviar-mensagem 1.png'} onClick={fazerComentario} />
                            </div>
                        </div>
                    }


                    {comentario.map(item =>



                        <div className='comentario'>
                            <p className='nome-cliente'>{item.cliente}
                            </p>
                            <div class="v-line">
                            </div>
                            <p className='desc-comentario'>{item.comentário}</p>
                            <p className='data-comentario'>{item.data}</p>


                        </div>


                    )}
                </div>

            </div>





        </main>
    );

}