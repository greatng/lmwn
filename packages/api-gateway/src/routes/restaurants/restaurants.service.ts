import { CACHE_EXPIRATION } from '../../shared/models/models';
import { CacheData } from '../../utils/cache.utils';
import { Restaurant } from './restaurants.model';

const restaurantCache = new CacheData<Restaurant>();

export const restaurantsService = async (
    restaurantId: string
): Promise<Restaurant> => {
    let data = restaurantCache.get(restaurantId);

    if (data) {
        return data;
    } else {
        const apiEndpoint = `${process.env.DATA_ENDPOINT}/restaurants/${restaurantId}.json`;
        const response = fetch(apiEndpoint)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }

                return res.json();
            })
            .then((data: Restaurant) => {
                restaurantCache.set(restaurantId, data, CACHE_EXPIRATION);

                return data;
            });

        return response;
    }
};

