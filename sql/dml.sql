-- Inserir tipo de serviço
insert into tb_tipo_serv (nm_nome, ds_carga_hr)
     values('Manutenção de computadores', '13:00 às 19:00');
     
-- Cadastro
     insert into tb_cliente (nm_cliente, ds_email, ds_senha, ds_cpf, ds_telefone, dt_nasc)
     values('Adamastor', 'adamas@gmail.com', '1234', '459.411.888-33', '96962-9301', '2000-12-25');
insert into tb_profissional (nm_profissional, ds_email, ds_senha, ds_cpf, ds_telefone, dt_nasc, id_tipo_serv, nr_servicos, dq_espartech)
     values('Gabriel', 'gabriel@gmail.com', '1234', '123.456.789-00', '99999-9999', '1995-08-23', 1, 72, true);
     
     


-- Login, Validar ifnull por meio da api

 select id_cliente      id,
        nm_cliente      nome
   from tb_cliente
  where ds_email = 'adamas@gmail.com'
    and ds_senha = '1234';
    
select id_profissional       id,
        nm_profissional      nome
   from tb_profissional
  where ds_email = 'gabriel@gmail.com'
    and ds_senha = '1234';
    

-- Busca de profissionais

select nm_profissional    nome,
       id_tipo_serv       serviço,
       nr_servicos        n°servicos,
       dq_espartech       destaque,
       arq_foto           foto
       from tb_profissional;
    
    
-- Comentário no perfil do profissional

insert into tb_comentario_prof (id_cliente, id_profissional, ds_comentario, dt_comentario)
values (1, 1, 'Ótimo profissional', '2022-09-14 18:50:46');

select id_comentario    id,
       id_cliente       cliente,
       id_profissional  profissional,
       ds_comentario    comentário,
       DATE_FORMAT (dt_comentario,'%d/%m/%Y %H:%i:%S') AS 'data'
    from tb_comentario_prof;