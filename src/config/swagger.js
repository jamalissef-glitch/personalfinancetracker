import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
      description:
        "REST API for managing personal finances, transactions, categories, profile pictures, and admin overview.",
    },

    servers: [
      {
        url:
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000"
            : "https://personal-finance-tracker-xdul.onrender.com",

        description:
          process.env.NODE_ENV === "development"
            ? "Local development server"
            : "Production server",
      },
    ],

    tags: [
      {
        name: "Auth",
        description: "Authentication and user profile endpoints",
      },
      {
        name: "Categories",
        description: "Financial category endpoints",
      },
      {
        name: "Transactions",
        description: "Income and expense transaction endpoints",
      },
      {
        name: "Upload",
        description: "Profile picture upload endpoints",
      },
      {
        name: "Admin",
        description: "Admin-only endpoints",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: ["name", "email", "password"],
          properties: {
            name: {
              type: "string",
              example: "Ayaan",
            },
            email: {
              type: "string",
              format: "email",
              example: "ayaan@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "123456",
            },
          },
        },

        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "ayaan@example.com",
            },
            password: {
              type: "string",
              format: "password",
              example: "123456",
            },
          },
        },

        Transaction: {
          type: "object",
          required: ["amount", "type", "category"],
          properties: {
            amount: {
              type: "number",
              minimum: 0,
              example: 25,
            },

            type: {
              type: "string",
              enum: ["income", "expense"],
              example: "expense",
            },

            category: {
              type: "string",
              example: "68b123456789abcdef123456",
            },

            description: {
              type: "string",
              example: "Lunch",
            },

            date: {
              type: "string",
              format: "date",
              example: "2026-09-01",
            },
          },
        },

        Category: {
          type: "object",
          required: ["name", "type"],
          properties: {
            name: {
              type: "string",
              example: "Food",
            },

            type: {
              type: "string",
              enum: ["income", "expense"],
              example: "expense",
            },

            description: {
              type: "string",
              example: "Food and dining expenses",
            },

            isDefault: {
              type: "boolean",
              example: true,
            },
          },
        },

        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "68b123456789abcdef123456",
            },

            name: {
              type: "string",
              example: "Ayaan",
            },

            email: {
              type: "string",
              example: "ayaan@example.com",
            },

            role: {
              type: "string",
              enum: ["user", "admin"],
              example: "user",
            },

            profilePicture: {
              type: "string",
              nullable: true,
              example: "https://res.cloudinary.com/example/image/upload/profile.jpg",
            },
          },
        },
      },
    },
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;