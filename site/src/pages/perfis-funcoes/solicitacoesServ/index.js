import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { aceitarServiço, SolicitacoesServicos, PrecificarServico, deletarServico } from '../../../api/servico';
import './index.scss';
import { toast, Toaster } from 'react-hot-toast'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export default function SolicitacoesServ() {
    const [clientes, setClientes] = useState([])
    const [preco, setPreco] = useState()

    const navigate = useNavigate();
    const { idParam } = useParams()

    function home() {
        navigate('/')
    }

    function perfil() {
        navigate(`/meus-servicos/${idParam}`)
    }

    async function carregarSolicitacoes() {
        const resposta = await SolicitacoesServicos(idParam);
        setClientes(resposta)
    }

    
    useEffect(() => {
        carregarSolicitacoes();
    }, [])
    
    async function Deletarsolicitacao(id) {

        confirmAlert({
            title: 'Remover serviço',
            message: `Deseja recusar o serviço ?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: async () => {

                        const negar = await deletarServico(id)

                        toast.loading("Excluindo...")

                        setTimeout(() => {
                            toast.dismiss();
                            toast.success(`Serviço Recusado!`)
                            carregarSolicitacoes()
                        }, 600);



                    }
                },
                {
                    label: 'Não'
                }
            ]


        })
    }
    async function AceitarSolicitacao(id) {
        try {
            const precificar = await PrecificarServico(id, preco)
            console.log(precificar)
            await aceitarServiço(id);
            toast.loading('Aceitando...');

            setTimeout(() => {
                toast.dismiss();
                toast.success('Serviço aceito!')
            }, 600);
            
        }
        catch (err) {
            if (err.response)
                toast.error(err.response.data.erro);
            else {
                toast.error(err.message)
            }
        }
    }



    return (
        <main className="remocao">
            <header className="barra">

                <div>
                    <img onClick={home} className='logo' src='/assets/images/teste final 1.png' />
                </div>

                <h1>Solicitações de Serviço</h1>

                <div className='volta' onClick={perfil}>
                    <img className='menu' src='/assets/images/voltar.png' />
                    <p>voltar</p>
                </div>

            </header>

            <section>
                <table>
                    <thead>
                        <tr>
                            <th className="inicio">nome do cliente</th>
                            <th>tipo de serviço</th>
                            <th>data do serviço</th>
                            <th>localização</th>
                            <th>Valor</th>
                            <th className="fim">decisão</th>
                        </tr>

                    </thead>
                    <tbody>

                        {clientes.map(item =>
                            <tr>
                                <td>{item.cliente}</td>
                                <td>{item.tipo_servico}</td>
                                <td>{item.data}</td>
                                <td>{item.rua + ', ' + item.complemento + '- ' + item.bairro}</td>
                                <td><input type='number' className='setar-preco' value={preco} onChange={e => setPreco(e.target.value)}/></td>
                                <td>
                                    <button onClick={() => AceitarSolicitacao(item.id)}><img src="/assets/images/aceitar.png" alt="" /></button>
                                    <button onClick={() => Deletarsolicitacao(item.id)}><img src="/assets/images/recusar.png" alt="" /></button>
                                </td>
                            </tr>
                        )}

                    </tbody>
                </table>
                        <Toaster/>
            </section>

        </main>
    )
}

