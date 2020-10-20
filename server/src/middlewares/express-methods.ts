import express from 'express';

const app: express.Application = express();
const { Router } = express;
const jsonBodyParser = express.json();

export { app, Router, jsonBodyParser };
