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
          brand: { type: 'string', example: 'HP' },
          imageUrl: { type: 'string', example: 'https://example.com/laptop.jpg' }
        }
      },
      ProductInput: {
        type: 'object',
        required: ['name', 'description', 'price', 'stock', 'category', 'brand'],
        properties: {
          name: { type: 'string', example: 'Laptop HP' },
          description: { type: 'string', example: 'Laptop HP 15 pulgadas, 8GB RAM' },
          price: { type: 'number', example: 999.99 },
          stock: { type: 'integer', example: 50 },
          category: { type: 'string', example: 'electronics' },
          brand: { type: 'string', example: 'HP' },
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
          userId: { type: 'string', example: '1234567890' },
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                productId: { type: 'string', example: '60c72b2f9b1e8a001f8e4ccc' },
                quantity: { type: 'integer', example: 2 }
              }
            }
          },
          description: { type: 'string', example: 'Orden de productos electrónicos' },
          discount: { type: 'number', example: 100, description: 'Monto del descuento aplicado' },
          couponCode: { type: 'string', nullable: true, example: 'DESCUENTO20', description: 'Código del cupón aplicado' },
          totalAmount: { type: 'number', example: 1899.98, description: 'Total final (subtotal - descuento)' },
          status: { type: 'string', enum: ['pending', 'completed', 'cancelled'], example: 'pending' },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' }
        }
      },
      OrderInput: {
        type: 'object',
        required: ['userId', 'products', 'description', 'subtotal'],
        properties: {
          userId: { type: 'string', example: '1234567890' },
          products: {
            type: 'array',
            items: {
              type: 'object',
              required: ['productId', 'quantity'],
              properties: {
                productId: { type: 'string', example: '60c72b2f9b1e8a001f8e4ccc' },
                quantity: { type: 'integer', example: 2, minimum: 1 }
              }
            }
          },
          description: { type: 'string', example: 'Orden de productos electrónicos' },
          subtotal: { type: 'number', example: 1999.98, description: 'Subtotal antes de aplicar descuentos' },
          couponCode: { type: 'string', example: 'DESCUENTO20', description: 'Código de cupón opcional' },
          status: { type: 'string', enum: ['pending', 'completed', 'cancelled'], example: 'pending' }
        }
      },
        Coupon: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '60c72b2f9b1e8a001f8e4eee' },
          code: { type: 'string', example: 'DESCUENTO20' },
          discountType: { type: 'string', enum: ['percentage', 'fixed'], example: 'percentage' },
          discountValue: { type: 'number', example: 20 },
          minPurchaseAmount: { type: 'number', example: 100 },
          maxUses: { type: 'number', nullable: true, example: 100 },
          usedCount: { type: 'number', example: 15 },
          expirationDate: { type: 'string', format: 'date-time', nullable: true, example: '2024-12-31T23:59:59Z' },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', format: 'date-time', example: '2024-01-01T00:00:00Z' }
        }
      },
      CouponInput: {
        type: 'object',
        required: ['code', 'discountType', 'discountValue'],
        properties: {
          code: { type: 'string', example: 'DESCUENTO20', description: 'Código único del cupón (se convertirá a mayúsculas)' },
          discountType: { type: 'string', enum: ['percentage', 'fixed'], example: 'percentage', description: 'Tipo de descuento: percentage (porcentual) o fixed (monto fijo)' },
          discountValue: { type: 'number', example: 20, description: 'Valor del descuento (20 para 20% o 100 para $100)' },
          minPurchaseAmount: { type: 'number', example: 100, description: 'Monto mínimo de compra requerido (opcional, default: 0)' },
          maxUses: { type: 'number', nullable: true, example: 100, description: 'Número máximo de usos (opcional, null = ilimitado)' },
          expirationDate: { type: 'string', format: 'date-time', nullable: true, example: '2024-12-31T23:59:59Z', description: 'Fecha de expiración (opcional, null = sin expiración)' },
          isActive: { type: 'boolean', example: true, description: 'Estado del cupón (opcional, default: true)' }
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