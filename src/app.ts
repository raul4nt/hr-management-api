import fastify from 'fastify';
import { employeesRoutes } from './http/controllers/employees/routes';

export const app = fastify();

app.register(employeesRoutes);
