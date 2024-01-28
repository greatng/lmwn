import { CacheData } from '../../utils/cache.utils';
import { restaurantsService } from './restaurants.service';

const mockCacheGet = jest.spyOn(CacheData.prototype, 'get');

describe('restaurants.service', () => {
    const mockRestaurantId = '1';
    const mockRestraurant = { name: 'testRestaurant' };
    let fetchSpy: jest.SpyInstance;

    beforeEach(() => {
        fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return restaurant data and save to cache when API is resolved and requested id exist', async () => {
        mockCacheGet.mockReturnValue(undefined);

        fetchSpy.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockRestraurant),
        } as Response);

        const restaurant = restaurantsService(mockRestaurantId);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.DATA_ENDPOINT}/restaurants/${mockRestaurantId}.json`
        );

        await restaurant.then((data) => {
            expect(data).toEqual(mockRestraurant);
        });
    });

    it('should thrown an error when response is not ok', async () => {
        mockCacheGet.mockReturnValue(undefined);

        fetchSpy.mockResolvedValue({
            status: 400,
            statusText: 'Not ok',
        } as Response);

        const restaurant = restaurantsService(mockRestaurantId);

        expect(global.fetch).toHaveBeenCalledWith(
            `${process.env.DATA_ENDPOINT}/restaurants/${mockRestaurantId}.json`
        );

        await restaurant.catch((error) => {
            expect(error).toEqual(new Error('Not ok'));
        });
    });

    it('should return restaurant data from cache requested id exist', async () => {
        mockCacheGet.mockReturnValue(mockRestraurant);

        const restaurant = restaurantsService(mockRestaurantId);

        await restaurant.then((data) => {
            expect(data).toEqual(mockRestraurant);
        });
    });
});

