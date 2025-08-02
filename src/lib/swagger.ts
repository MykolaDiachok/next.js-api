import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation with Swagger',
    },
    servers: [
        {
            url: 'http://localhost:3000/api',
        },
    ],
};

export const options = {
    swaggerDefinition,
    apis: ['./src/app/api/**/*.ts'], // шлях до твоїх роутів з JSDoc
};

export const swaggerSpec = swaggerJsdoc(options);