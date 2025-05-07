import { FastifyInstance } from "fastify";
import { profile } from "./profile";

export async function employeeRoutes(app: FastifyInstance) {
    app.get('/employees', profile)
}