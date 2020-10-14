const express = require('express');

const app = express();
app.use(express.json())
const { Router } = express;
const jsonBodyParser = express.json();

module.exports = { app, Router, jsonBodyParser };
