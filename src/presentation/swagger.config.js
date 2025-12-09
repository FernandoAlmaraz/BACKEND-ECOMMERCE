const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'E-Commerce API Documentation',
    version: '1.0.0',
    description: 'Documentación completa de la API de E-Commerce',
  },
  servers: [
    {
      url: `http://localhost:${process.env.PORT || 8080}/api/v1`,
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      }
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
          roles: {
            type: 'array',
            items: { type: 'string' },
            example: ['user']
          }
        }
      },
      UserInput: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: { type: 'string', example: 'John Doe' },
          email: { type: 'string', example: 'john.doe@example.com' },
          password: { type: 'string', example: 'password123' },
          roles: {
            type: 'array',
            items: { type: 'string' },
            example: ['user']
          }
        }
      },
      Role: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60c72b2f9b1e8a001f8e4cbb' },
          name: { type: 'string', example: 'admin' }
        }
      },
      RoleInput: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', example: 'admin' }
        }
      },
      Product: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60c72b2f9b1e8a001f8e4ccc' },
          name: { type: 'string', example: 'Laptop HP' },
          description: { type: 'string', example: 'Laptop HP 15 pulgadas, 8GB RAM' },
          price: { type: 'number', example: 999.99 },
          stock: { type: 'integer', example: 50 },
          category: { type: 'string', example: 'electronics' },
          imageUrl: { type: 'string', example: 'https://example.com/laptop.jpg' }
        }
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'stock', 'category'],
        properties: {
          name: { type: 'string', example: 'Laptop HP' },
          description: { type: 'string', example: 'Laptop HP 15 pulgadas, 8GB RAM' },
          price: { type: 'number', example: 999.99 },
          stock: { type: 'integer', example: 50 },
          category: { type: 'string', example: 'electronics' },
          imageUrl: { type: 'string', example: 'https://example.com/laptop.jpg' }
        }
      },
      LoginInput: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string', example: 'john.doe@example.com' },
          password: { type: 'string', example: 'password123' }
        }
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          user: { $ref: '#/components/schemas/User' }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Error message' }
        }
      },
      Order: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60c72b2f9b1e8a001f8e4ddd' },
          user: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: { type: 'string', example: '60c72b2f9b1e8a001f8e4ccc' },
                quantity: { type: 'integer', example: 2 }
              }
            }
          },
          total: { type: 'number', example: 1999.98 },
          status: { type: 'string', example: 'pending' }
        }
      },
      OrderInput: {
        type: 'object',
        required: ['user', 'products'],
        properties: {
          user: { type: 'string', example: '60c72b2f9b1e8a001f8e4caa' },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                product: { type: 'string', example: '60c72b2f9b1e8a001f8e4ccc' },
                quantity: { type: 'integer', example: 2 }
              }
            }
          },
          status: { type: 'string', example: 'pending' }
        }
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
};

const options = {
  swaggerDefinition,
  apis: ['./src/presentation/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;