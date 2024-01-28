import { Router } from 'express';
import { restaurantsController } from './restaurants/restaurants.controller';
import { menusController } from './menus/menus.controller';

const api = Router();

api.get(['/restaurants/:restaurantId', '/restaurants'], restaurantsController);
api.get(
    ['/restaurants/:restaurantId/menus/:menuName/:menuType'],
    menusController
);

export default api;

