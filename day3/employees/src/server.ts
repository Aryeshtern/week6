import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database";
import AuthRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Schema } from "mongoose";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "employees proyect",
      version: "1.0.0",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          require: true,
          properties: {
            userName: {
              type: String
            },
            password: {
              type: String
            },
            role: {
              type: String
            },
            salary: {
              type: Number,
            },
            yearsOfExperience: {
              type: Number,
            },
            startDate: {
              type: Date,
            },
            age: {
              type: Number,
            },
            lastLogin: {
              type: Date,
            },
            Department: {
              type: Schema.Types.ObjectId
            },
          }
        },
      },
    },
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
  apis: ["./day3/employees/src/routes/*.ts"],
};

const openapiSpecification = swaggerJsdoc(options);

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

const PORT = process.env.PORT || 3000;

app.use("/auth", AuthRouter);

app.use("/employees", userRouter);

connectToDatabase();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
