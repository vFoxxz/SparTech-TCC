import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ServicoConcluido } from '../../../api/servico';
import './index.scss';

export default function ServicosContratados() {
    const [servico, setServico] = useState([])

    const navigate = useNavigate();
    const {idParam} = useParams()
    

   

    function home() {
        navigate('/')
    }

    async function carregarConclusoes() {
        const resposta = await ServicoConcluido(idParam);
        setServico(resposta)
    }

    useEffect(() => {
        carregarConclusoes()
    }, [])

    function perfil() {
        navigate(`/meus-servicos/${idParam}`)
    }

    


    return (
        <main className="remocao">
            <header className="barra">

                <div>
                    <img onClick={home} className='logo' src='/assets/images/teste final 1.png' />
                </div>

                <h1>Serviços Concluídos</h1>

                <div className='volta' onClick={perfil}>
                    <img className='menu' src='/assets/images/voltar.png' />
                    <p>voltar</p>
                </div>

            </header>

            <section>
                <table>
                    <thead>
                        <tr>
                            <th className="inicio">nome do profissional</th>
                            <th>tipo de serviço</th>
                            <th>data do serviço</th>
                            <th>chat</th>
                            <th className="fim">concluído</th>
                        </tr>

                    </thead>
                    <tbody>
                    
                    
                        {servico.map(item =>
                            <tr>
                                <td>{item.profissional}</td>
                                <td>{item.tipo_servico}</td>
                                <td>{item.data}</td>
                                <td>{item.rua + ', ' + item.complemento + '- ' + item.bairro}</td>
                                <td><a href={'https://wa.me/55' + item.telefone_cliente}><button><img src="/assets/images/chat.png" className='chat' alt="" /></button></a></td>
                            </tr>
                        )}

                    </tbody>
                </table>
            </section>

        </main>
    )
}

