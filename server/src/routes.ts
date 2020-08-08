import express from 'express';

import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsController();


routes.get('/classes', classesControllers.index);

routes.post('/classes', classesControllers.create );

routes.get('/conncections',connectionsController.index )
routes.post('/conncections',connectionsController.create )

export default routes;