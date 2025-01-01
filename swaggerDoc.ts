// swaggerDoc.ts
require('dotenv').config()
import { SwaggerDefinition } from 'swagger-jsdoc';
/**
 * @swagger
 * /horoscope:
 *   get:
 *     summary: Get zodiac sign and information
 *     description: Get zodiac sign and horoscope based on the provided birthdate.
 *     parameters:
 *       - in: query
 *         name: birthdate
 *         required: true
 *         schema:
 *           type: string
 *           example: '1990-04-15'
 *         description: The birthdate of the person in YYYY-MM-DD format.
 *     responses:
 *       200:
 *         description: Successful response with zodiac sign and information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sign:
 *                   type: string
 *                   example: 'Aries'
 *                 zodiac:
 *                   type: string
 *                   example: 'Aries'
 *       400:
 *         description: Bad request if birthdate is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Birthdate is required.'
 *       500:
 *         description: Internal server error if the zodiac sign cannot be determined
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Error determining the zodiac sign.'
 */

export const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Horoscope API',
    version: '1.0.0',
    description: 'A simple API to get zodiac signs based on birthdate',
  },
  servers: [
    {
      url: "https://horoscope-api-aodx.onrender.com",
    },
  ],
};
