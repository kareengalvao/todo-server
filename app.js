const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let todos = [
  { id: 1, task: 'Estudar Express', completed: false },
  { id: 2, task: 'Criar API REST', completed: false }
];

// Rota para listar todas as tarefas
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Rota para adicionar uma nova tarefa
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Rota para atualizar uma tarefa
// Rota para atualizar uma tarefa
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);
    
    if (!todo) {
      return res.status(404).send('Tarefa não encontrada');
    }
  
    todo.task = req.body.task || todo.task;
    todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
    res.json(todo);
  });
  

// Rota para deletar uma tarefa
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).send('Tarefa não encontrada');
  }

  todos.splice(todoIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});