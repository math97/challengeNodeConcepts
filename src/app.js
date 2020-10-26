const express = require("express");
const cors = require("cors");
const { uuid } = require('uuidv4')

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title , url , techs} = request.body;
  const repository = {id:uuid() , title, url, techs , likes:0}
  repositories.push(repository)

  return response.json(repository)
  
});

app.put("/repositories/:id", (request, response) => {
  const { id } =  request.params;

  const { title,url , techs} =  request.body;

  const repositoryIndex= repositories.findIndex(rep=>rep.id===id)

  if(repositoryIndex<0) return response.status(400).json({error:'Repository not found'})

  const repository = {
    id,title,url,techs,likes:repositories[repositoryIndex].likes
  }
  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } =  request.params;
  //console.log(`Repositorios antes da exclusão:${JSON.stringify(repositories)} id:${id}`);
  const repositoryIndex = repositories.findIndex(rep=>rep.id===id)
  console.log(repositoryIndex);

  if(repositoryIndex >= 0) repositories.splice(repositoryIndex,1)
  else  return response.status(400).json({erro:'Repository not found'})

  return response.status(204).send()
  
 

  

  //console.log(`Repositorios depois da exclusão:${JSON.stringify(repositories)}`);

 

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } =  request.params;
  const repositoryIndex = repositories.findIndex(rep=>rep.id===id)
  if(repositoryIndex<0) return response.status(400).
  json({error:'Repository not found'})

  repositories[repositoryIndex].likes += 1;

  return response.json(repositories[repositoryIndex])
  
});

module.exports = app;
