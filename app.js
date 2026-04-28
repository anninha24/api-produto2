// ============================================================
// APP.JS - Arquivo Principal com dotenv
// ============================================================

// Carregar variáveis de ambiente ANTES de tudo
require('dotenv').config();

const express = require('express');
const cors = require('cors'); // 🔥 IMPORTANTE

const app = express();

// Porta vem do .env, ou usa 3000 como padrão
const PORT = process.env.PORT || 3000;

// ============================================================
// MIDDLEWARES
// ============================================================

// 🔥 LIBERAR CORS (ESSENCIAL PRO FRONT)
app.use(cors());

// 🔥 SERVIR ARQUIVOS ESTÁTICOS (opcional)
app.use(express.static('public'));

// 🔥 JSON
app.use(express.json());

// ============================================================
// ROTAS
// ============================================================

const produtoRoutes = require('./src/routes/produtoRoutes');
app.use('/produtos', produtoRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API de Produtos com PostgreSQL',
    versao: '3.0',
    ambiente: process.env.NODE_ENV || 'development',
    banco: 'PostgreSQL'
  });
});

// rota padrão → abrir home
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco: PostgreSQL (${process.env.DB_NAME})`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});