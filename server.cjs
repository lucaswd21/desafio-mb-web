const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.post('/registration', (req, res) => {
  const item = req.body;
  
  if (Object.values(item).find(value => value === '' || value === null)) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios.', status: 400 });
  }
  
  res.status(200).json({ message: 'Cadastro realizado com sucesso!', status: 200 });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
})