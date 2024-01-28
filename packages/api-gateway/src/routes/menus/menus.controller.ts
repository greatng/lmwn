import { Request, Response } from 'express';
import { menusService } from './menus.service';
import {
    ERROR_STATUS,
    INCOMPLETE_DATA,
    INTERNAL_ERROR_MESSAGE,
} from '../../shared/models/models';
import { MenuType } from './menus.models';
import { errorLogger } from '../../utils/logger.utils';

export const menusController = async (req: Request, res: Response) => {
    const { params } = req;

    if (params?.restaurantId && params?.menuName && params?.menuType) {
        await menusService(
            params.restaurantId,
            params.menuName,
            params.menuType as MenuType
        )
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
        res.send({ message: INCOMPLETE_DATA });
    }
};

