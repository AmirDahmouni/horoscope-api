import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());


// Route zodiac.sign
app.get('/horoscope', (req: Request, res: Response): any => {

  const { birthdate } = req.query;

  if (!birthdate)
    return res.status(400).json({ error: 'Birthdate is required' });

  else
    return res.status(200).json({ message: birthdate });

});


// Gestionnaire d'erreurs global pour toutes les autres erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});


app.listen(port, () => {
  console.log(`Horoscope-api is running on port ${port}`);
});

export default app;