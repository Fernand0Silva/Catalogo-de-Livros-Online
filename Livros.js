const express = require('express');
const port = 3000;
const app = express();
app.use(express.json());

let livro =[];

app.post('/criarLivro',(req,res)=>{
 const {titulo,autor,anoPublicacao,descricao} = req.body;
 if(!titulo|| !autor|| !anoPublicacao|| !descricao){
    return res.status(404).send('titulo,autor,anoPublicacao ou descricao ausentes!!!');
 }
 const novoLivro ={id: livro.length +1,titulo,autor,anoPublicacao,descricao};
 livro.push(novoLivro);
 res.status(201).json(novoLivro);
});

app.get('/listarLivro',(req,res)   =>{
    res.json(livro);
});

app.get('/listarLivro/:id',(req,res)   =>{
  const livroId = livro.find(p => p.id === parseInt(req.params.id));
  if(!livro){
    return res.status(404).send('Livro não encontrado -_- ');
  }
  res.json(livroId);
});

app.put('/atualizarLivro/:id',(req,res) => {
  const livroAtualizado = livro.find(p => p.id === parseInt(req.params.id));
  if(!livroAtualizado){
    return res.status(404).send('Livro não encontrado -_- ');
  }
  const {titulo,autor,anoPublicacao,descricao} = req.body;

  livroAtualizado.titulo = titulo|| livroAtualizado.titulo;
  livroAtualizado.autor = autor|| livroAtualizado.autor;
  livroAtualizado.anoPublicacao = anoPublicacao|| livroAtualizado.anoPublicacao;
  livroAtualizado.descricao = descricao|| livroAtualizado.descricao;

  res.send(livroAtualizado);
});

app.delete('/excluirLivro/:id',(req,res)   =>{
    const livroExcluir = livro.find(p => p.id === parseInt(req.params.id));
    if(livroExcluir === -1){
        return res.status(404).send('Livro não encontrado -_- ');
    }
    livro.splice(livroExcluir,1);
    res.status(204).send('Livro excluido com sucesso!!!');
});

app.get('/',(req,res) =>{
    return res.json('BackEnd ligado');
});

app.listen(port,()=> {
    console.log(`Servisor rodando na http://localhost:${port}`)
});