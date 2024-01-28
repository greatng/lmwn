import { Request, Response } from 'express';
import { restaurantsService } from './restaurants.service';
import {
    ERROR_STATUS,
    INTERNAL_ERROR_MESSAGE,
    NO_ID,
} from '../../shared/models/models';
import { errorLogger } from '../../utils/logger.utils';

export const restaurantsController = async (req: Request, res: Response) => {
    const { params } = req;

    if (params?.restaurantId) {
        await restaurantsService(params.restaurantId)
            .then((data) => {
                res.send(data);
            })
            .catch((error: Error) => {
                errorLogger(error.message);

                res.status(ERROR_STATUS).send({
                    message: INTERNAL_ERROR_MESSAGE,
                });
            });
    } else {
        res.send({ message: NO_ID });
    }
};

