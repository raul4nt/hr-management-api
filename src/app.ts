import fastify from 'fastify';
import { employeeRoutes } from './http/controllers/employees/routes';

export const app = fastify();

app.register(employeeRoutes);
