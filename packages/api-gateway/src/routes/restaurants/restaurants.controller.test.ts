import { Response, Request } from 'express';
import {
    ERROR_STATUS,
    INTERNAL_ERROR_MESSAGE,
    NO_ID,
} from '../../shared/models/models';

import { errorLogger } from '../../utils/logger.utils';
import { restaurantsController } from './restaurants.controller';
import { restaurantsService } from './restaurants.service';

jest.mock('./restaurants.service', () => ({
    restaurantsService: jest.fn(),
}));

jest.mock('../../utils/logger.utils', () => ({
    errorLogger: jest.fn(),
}));

describe('menus.controller', () => {
    const req = {
        params: {
            restaurantId: '1',
        },
    } as unknown as Request;
    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send restaurant data when promise from service is resolved', async () => {
        (restaurantsService as jest.Mock).mockResolvedValue({
            name: 'testRestaurant',
        });

        await restaurantsController(req, res);

        expect(res.send).toHaveBeenCalledWith({ name: 'testRestaurant' });
    });

    it('should send message when no restaurant ID exist', async () => {
        const mockReq = {} as unknown as Request;

        await restaurantsController(mockReq, res);

        expect(res.send).toHaveBeenCalledWith({ message: NO_ID });
    });

    it('should send error message and log error when promise from service is rejected', async () => {
        (restaurantsService as jest.Mock).mockRejectedValue(
            new Error('Not ok')
        );

        await restaurantsController(req, res);

        expect(errorLogger).toHaveBeenCalledWith('Not ok');
        expect(res.status).toHaveBeenCalledWith(ERROR_STATUS);
        expect(res.send).toHaveBeenCalledWith({
            message: INTERNAL_ERROR_MESSAGE,
        });
    });
});

