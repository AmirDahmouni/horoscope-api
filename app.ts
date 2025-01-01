import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import validateBirthdate from './middlewares/validateBirthday';

require('dotenv').config()
const getSign = require('horoscope').getSign;
const getZodiac = require('horoscope').getZodiac;
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', (req: Request, res: Response): any => {
  return res.status(400).json({ message: 'Welcome to Horoscope API !' });
});

// Route zodiac.sign
app.get('/horoscope', validateBirthdate, (req: Request, res: Response): any => {

  const { birthdate } = req.query;

  if (!birthdate)
    return res.status(400).json({ error: 'Birthdate is required' });

  const date = new Date(birthdate as string);
  try {

    const sign = getSign({ month: date.getMonth() + 1, day: date.getDate() });
    const zodiac = getZodiac(date.getFullYear())

    return res.json({ sign, zodiac });
  } catch (err) {
    return res.status(500).json({ error: 'Error determining the zodiac sign.' });
  }

});

// Middleware 404 pour gérer les routes non définies
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: 'Route not found' });
});

// Gestionnaire d'erreurs global pour toutes les autres erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(port, () => {
  console.log(`Horoscope-api is running on port ${port}`);
});

export default app;