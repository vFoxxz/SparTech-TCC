import { Router } from "express";
import multer from 'multer'
import {BuscaProfissional,enviarFotoCliente, enviarFotoProfissional, fazerComentario, inserirAtuacao, inserirLicencas, PerfilProfissional, verComentarios} from '../repository/profissionalRepository.js'

const uploadCliente = multer({ dest: 'storage/FotosCliente'})
const uploadProfissional = multer({ dest: 'storage/FotosProfissional'})
const server = Router();

//Consultar Profissionais
server.get('/profissional/buscar/nome', async(req, resp) => {
    try{
    const {nm} = req.query;

    const resposta = await BuscaProfissional(nm)
    if(!resposta){
        resp.status(404).send([])
    }
    else{
    resp.send(resposta)
}
    } catch(err){
        resp.send({
            erro: err.message
        })
    }
})

//Inserir Foto no Perfil - Cliente
server.put(`/cliente/:id/foto`,uploadCliente.single('foto'), async(req, resp)=> {
    try {
        if(!req.file){
            throw new Error('A foto é obrigatória')
        }
        const {id} = req.params;
        const foto = req.file.path;

        const resposta = await enviarFotoCliente(foto, id);
        if(resposta != 1){
            throw new Error('A foto não pode ser salva.')
        }
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            error: err.message
        })
    }
})
//Inserir Foto no Perfil - Profissional
server.put(`/profissional/:id/foto`,uploadProfissional.single('foto'), async(req, resp)=> {
    try {
        if(!req.file){
            throw new Error('A foto é obrigatória')
        }
        const {id} = req.params;
        const foto = req.file.path;

        const resposta = await enviarFotoProfissional(foto, id);
        if(resposta != 1){
            throw new Error('A foto não pode ser salva.')
        }
        resp.status(204).send();
    } catch (err) {
        resp.status(400).send({
            error: err.message
        })
    }
})
//Inserir Comentário
server.post('/comentario', async (req, resp) => {
    try{
        const novoComentario = req.body;

        if(!novoComentario.IDcliente){
            throw new Error('É necessário estar logado para comentar!')
        }
        if(!novoComentario.comentario){
            throw new Error('Comentário é obrigatório!');
        }

        const comentario = await fazerComentario(novoComentario);
        resp.send(comentario)
    } 
    catch(err){
        resp.status(401).send({
            erro:err.message
        })

    }
})
//Ver Comentários
server.get('/verComentario', async (req, resp) => {
    try{
        const resposta = await verComentarios();
        resp.send(resposta)
    }
    catch(err){
        resp.status(401).send({
            erro: err.message
        })
    }
})
//Inserir Área de Atuação
server.post('/profissional/area', async (req, resp) => {
    try{
        const novaArea = req.body;
        if(!novaArea.atuacao){
                    throw new Error('Área de atuação é obrigatória!');
        }

        if(!novaArea.IDprofissional){
            throw new Error('É necessário estar logado!')
        }
       

        const area = await inserirAtuacao(novaArea);

        resp.send(area)
    } 
    catch(err){
        resp.status(401).send({
            erro:err.message
        })

    }
})
//Inserir Licença / Certificado
server.post('/profissional/licenca', async (req, resp) => {
    try{
        const novoCertificado = req.body;
        if(!novoCertificado.licenca){
                    throw new Error('Certificado ou Licença são obrigatórios!');
        }
        
        if(!novoCertificado.IDprofissional){
            throw new Error('É necessário estar logado!')
        }
       

        const licenca = await inserirLicencas(novoCertificado);

        resp.send(licenca)
    } 
    catch(err){
        resp.status(401).send({
            erro:err.message
        })

    }
})
//Perfil
server.get('/perfil/profissional/:id', async (req, resp) =>{
    try
    {
        const id = Number(req.params.id);

        const resposta = await PerfilProfissional(id);

        if(!resposta)
            resp.status(404).send([]);
        else
        resp.send(resposta);
    }

    catch(err)
    {
        resp.status(400).send({
            erro: err.message
        })
    }
})

export default server;