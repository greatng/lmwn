import { MenuType } from './menus.models';
import { menusService } from './menus.service';

describe('menus.service', () => {
    const mockMenu = { name: 'testMenu' };
    const mockRestaurantId = '1';
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
        fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return menu data when API is resolved and requested menu exist', async () => {
        fetchSpy.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockMenu),
        } as Response);

        const menu = menusService(
            mockRestaurantId,
            mockMenu.name,
            MenuType.Full
        );

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.DATA_ENDPOINT}/restaurants/${mockRestaurantId}/menus/${mockMenu.name}/${MenuType.Full}.json`
        );

        await menu.then((data) => {
            expect(data).toEqual(mockMenu);
        });
    });

    it('should thrown an error when response is not ok', async () => {
        fetchSpy.mockResolvedValue({
            status: 400,
            statusText: 'Not ok',
        } as Response);

        const menu = menusService(
            mockRestaurantId,
            mockMenu.name,
            MenuType.Full
        );

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.DATA_ENDPOINT}/restaurants/${mockRestaurantId}/menus/${mockMenu.name}/${MenuType.Full}.json`
        );

        await menu.catch((error) => {
            expect(error).toEqual(new Error('Not ok'));
        });
    });
});

