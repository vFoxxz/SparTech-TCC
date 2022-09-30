import './index.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { mostrarComentarios, MostrarPerfil } from '../../api/profissionalApi';
import storage from 'local-storage'
import Modal from 'react-modal'
import Editar from '../../components/editar-perfil'
export default function Perfilprofissional() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [avaliacao, setAvaliacao] = useState(0);
    const [atuacao, setAtuacao] = useState('');
    const [licenca, setLicenca] = useState('');
    const [perfil, setPerfil] = useState([])
    const [comentario, setComentario] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);


    const { idParam } = useParams();

    const navigate = useNavigate()

    useEffect(() => {
        if (idParam) {
            carregarPerfil();
        }

    }, [])

    async function carregarPerfil() {
        const resposta = await MostrarPerfil(idParam);
        console.log(resposta)
        setPerfil(resposta)
    }

    function escolherFoto() {
        document.getElementById('imagemPerfil').click();
    }

    async function carregarTodosComentarios() {
        const resposta = await mostrarComentarios();
        console.log(resposta)
        setComentario(resposta);
    }
    useEffect(() => {
        carregarTodosComentarios()
    }, [])


    function sairClick() {
        storage.remove('usuario-logado')
        navigate('/login')
    }

    useEffect(() => {
        if (!storage('usuario-logado')) {
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


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };


    return (
        <main className='Perfil-Profissional'>


            <div className='barra'>

                <div className="voltar" onClick={sairClick}>
                    <img src='/assets/images/voltar.png' />
                    <h1>sair</h1>
                </div>

                <div className="c">
                    <img className='Logo' src='/assets/images/teste final 1.png' />
                </div>
                <div className="acoes">
                    <h1 className='denunciar'>denunciar</h1>

                    <h1 className='servico'>Serviços</h1>
                </div>


            </div>
            {perfil.map(item =>
                <div>

                    <div className='fundo'>

                        <img src='/assets/images/pessoa.png' className="foto" />

                        <input type='file' id='imagemPerfil' />



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

                                <button onClick={openModal} className="botao-editar">
                                    <h1 className="perfil">editar perfil</h1>
                                    <img src='/assets/images/caneta.png' />
                                </button>
                                
                                <Modal
                                    isOpen={modalIsOpen}
                                    onRequestClose={closeModal}
                                    style={customStyles}
                                >
                                    <Editar onClick={closeModal} />
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
                    <h1>comentários sobre você</h1>

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