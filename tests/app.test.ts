import request from 'supertest';
import app from '../app';


const getSign = require('horoscope').getSign;
const getZodiac = require('horoscope').getZodiac;

jest.mock('horoscope', () => ({
  getSign: jest.fn(),
  getZodiac: jest.fn(),
}));

describe('Horoscope API', () => {
  // Test de la route GET /
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Welcome to Horoscope API !' });
  });

  // Test de la route GET /horoscope avec une date valide
  it('should return the zodiac sign and Chinese zodiac', async () => {
    (getSign as jest.Mock).mockReturnValue('Gemini');
    (getZodiac as jest.Mock).mockReturnValue('Rat');

    const response = await request(app)
      .get('/horoscope')
      .query({ birthdate: '1995-06-15' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ sign: 'Gemini', zodiac: 'Rat' });
  });

  // Test de la route GET /horoscope sans date
  it('should return an error when no birthdate is provided', async () => {
    const response = await request(app).get('/horoscope');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid birthdate format.' });
  });

  // Test de la gestion des routes 404
  it('should return a 404 error for unknown routes', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route not found' });
  });

  // Test d'erreur interne
  it('should return a 500 error if an exception occurs', async () => {
    (getSign as jest.Mock).mockImplementation(() => {
      throw new Error('Test Error');
    });

    const response = await request(app)
      .get('/horoscope')
      .query({ birthdate: '1995-06-15' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Error determining the zodiac sign.' });
  });
});
