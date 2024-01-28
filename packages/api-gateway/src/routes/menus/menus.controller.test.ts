import { MenuType } from './menus.models';
import { menusController } from './menus.controller';
import { Response, Request } from 'express';
import {
    ERROR_STATUS,
    INCOMPLETE_DATA,
    INTERNAL_ERROR_MESSAGE,
} from '../../shared/models/models';
import { menusService } from './menus.service';
import { errorLogger } from '../../utils/logger.utils';

jest.mock('./menus.service', () => ({
    menusService: jest.fn(),
}));

jest.mock('../../utils/logger.utils', () => ({
    errorLogger: jest.fn(),
}));

describe('menus.controller', () => {
    const req = {
        params: {
            restaurantId: '1',
            menuName: 'testMenu',
            menuType: MenuType.Full,
        },
    } as unknown as Request;
    const res = {
        send: jest.fn(),
        status: jest.fn().mockReturnThis(),
    } as unknown as Response;

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should send menu data when promise from service is resolved', async () => {
        (menusService as jest.Mock).mockResolvedValue({ name: 'testMenu' });

        await menusController(req, res);

        expect(res.send).toHaveBeenCalledWith({ name: 'testMenu' });
    });

    it('should send message when not all required params are exist', async () => {
        const mockReq = {} as unknown as Request;

        await menusController(mockReq, res);

        expect(res.send).toHaveBeenCalledWith({ message: INCOMPLETE_DATA });
    });

    it('should send error message and log error when promise from service is rejected', async () => {
        (menusService as jest.Mock).mockRejectedValue(new Error('Not ok'));

        await menusController(req, res);

        expect(errorLogger).toHaveBeenCalledWith('Not ok');
        expect(res.status).toHaveBeenCalledWith(ERROR_STATUS);
        expect(res.send).toHaveBeenCalledWith({
            message: INTERNAL_ERROR_MESSAGE,
        });
    });
});

