import fastify from "fastify";
import { employeeRoutes } from "./http/controllers/employee/routes";

export const app = fastify()

app.register(employeeRoutes)