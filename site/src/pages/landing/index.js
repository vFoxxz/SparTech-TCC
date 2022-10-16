import './index.scss';
import Header from '../../components/header';
import Categoria from '../../components/categoria';
import Carousel from 'react-elastic-carousel';
import Item from '../../components/carousel/Item';





export default function Landing() {


    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 750, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1560, itemsToShow: 4 }
      ];


    return (
        <main className='landing-page'>
            <Header />

            <section className='faixa-1'>

                <div className='introdução'>
                    <h1>A UM ANO LIGANDO O CLIENTE AOS MELHORES PROFISSIONAIS</h1>

                    <button className='b'>SAIBA MAIS</button>
                </div>
            </section>

            <section className='faixa-2'>

                <h4>serviços mais solicitados</h4>
                <div className='categorias'>
                    <Carousel breakPoints={breakPoints}>
                        <Categoria nome='Montagem e Manutenção de Computadores' number="1" />
                        <Categoria nome='limpeza e higienização de computadores'  number="2" />
                        <Categoria nome='CABEAMENTO DE REDES'  number="3" />
                        <Categoria nome='DESENVOLVIMENTO de websites'  number="4" />

                    </Carousel>

                </div>

            </section>

            <section className='destaques'>
                <div className="meio">
                    <div className="infos">
                        <h1>PROFISSIONAIS QUE ESTÃO EM NOSSO SITE</h1>
                        <div className='texts'>
                            <div className="a">
                                <h2>Bruno oliveira</h2>
                                <p>PROFISSIONAL ESPARTECH DESDE 2021</p>
                            </div>
                            <ul>
                                <li>DEV SÊNIOR</li>
                                <li>PROFESSOR</li>
                                <li>GESTOR DE EMPRESAS</li>
                            </ul>
                            <div className="avaliacao">
                                <div className="estrelas">
                                    <img src='/assets/images/estrela.png' />
                                    <img src='/assets/images/estrela.png' />
                                    <img src='/assets/images/estrela.png' />
                                    <img src='/assets/images/estrela.png' />
                                    <img src='/assets/images/estrela.png' />

                                </div>
                                <p>5.0</p>
                            </div>

                        </div>

                    </div>
                    <div className="foto">
                        <img src="./assets/images/bruno.png" />
                    </div>
                </div>

            </section>

            <section className='historia'>

                <div className="centro">

                    <h1>surgimento da EsparTech</h1>

                    <p>O EsparTech nasceu em 2021, com o propósito de conectar quem precisa com quem sabe fazer. Somos um plataforma que conecta clientes e profissionais.</p>

                </div>
                <div className='b'>
                    <div className='esquerda'>

                        <h1>Como o EsparTech funciona para o cliente?</h1>

                        <p>O cliente da EsparTech, terá o melhor serviço dos nossos profissionais. Caso o profissional não tenha cumprido com o trabalho, você será reembolsado!
                            pois para solicitar um serviço é necessário um entrada no pagamento no valor de 25 reais. </p>

                        <h1>como a espartech beneficia o profissional?</h1>

                        <p>O profissional da EsparTech, terá o reconhecimento REGIONAL pelo seu trabalho.
                            quanto mais avaliações positivas no site você tiver, mais será recomendado aos serviços</p>

                    </div>

                    <div className="direita">

                        <img src="./assets/images/oculos.png" />

                    </div>
                </div>
            </section>

            <section className="profissionais">

                <h1>profissionais de</h1>

                <div className='prof'>

                    <img src="./assets/images/moça2.png" />
                    <h3>alessandra f.</h3>
                    <p>Front-end</p>

                </div>

                <div className='prof'>

                    <img src="./assets/images/lindo.png" />
                    <h3>pedro</h3>
                    <p>ciência de dados</p>

                </div>

                <div className='prof'>

                    <img src="./assets/images/rafa.png" />
                    <h3>RAFAEL J.</h3>
                    <p>WEB-DESIGN</p>

                </div>


            </section>

            <section className="profissionais">

                <div className='prof'>

                    <img src="./assets/images/lucas.png" />
                    <h3>Lucas tatsuo</h3>
                    <p>BACK-END</p>

                </div>

                <div className='prof'>

                    <img src="./assets/images/gi.png" />
                    <h3>giovanna</h3>
                    <p>analista de sistemas</p>

                </div>

            </section>


            <section className='rodape'>

                <div className="logo">
                    <img src="./assets/images/teste final 1.png" />

                    <div className="patro">

                        <h1>patrocinadores:</h1>
                        <img src="./assets/images/frei.png" />

                    </div>

                </div>


                <div className="formas">

                    <h1 className='pagamento'>Formas de pagamento:</h1>

                    <div className="primeiro">

                        <img src="./assets/images/visa.png" />
                        <img src="./assets/images/MASTERCARD.png" />
                        <img src="./assets/images/MERCADO PAGO.png" />

                    </div>

                    <div className="segundo">

                        <img src="./assets/images/boleto.png" />
                        <img src="./assets/images/PIX.png" />
                        <img src="./assets/images/PIC PAY.png" />

                    </div>

                    <div className="terceiro">

                        <img src="./assets/images/paypal.png" />

                    </div>

                </div>

                <div className="login">

                    <h1>contrate já um profissional</h1>
                    <button>login</button>



                    <h1>Fale conosco:</h1>

                    <div className="insta">

                        <img src="./assets/images/insta.png" />
                        <p>@espartech_oficial</p>

                    </div>

                    <div className="twi">

                        <img src="./assets/images/tt.png" />
                        <p>@espartech</p>

                    </div>

                    <div className="email">

                        <img src="./assets/images/email.png" />
                        <p>espartech@gmail.com</p>

                    </div>

                </div>

            </section>

        </main>
    )
}