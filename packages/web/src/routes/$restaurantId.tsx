import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Restaurant } from '../types/restaurantInfo.type';
import HeroImage from '../components/HeroImage';
import RestaurantInfo from '../components/RestaurantInfo';
import MenuLayout from '../components/MenuLayout';
import ErrorNotice from '../components/ErrorNotice';
import { BACKEND_URL } from '../constants';

const RestaurantPage = () => {
    const { restaurantId }: { restaurantId: string } = useParams({
        from: '/$restaurantId',
    });
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchRestaurant = async () => {
            await fetch(`${BACKEND_URL}/api/restaurants/${restaurantId}`)
                .then((res) => {
                    if (!res.ok) throw new Error(res.statusText);

                    return res.json();
                })
                .then((data: Restaurant) => {
                    setIsError(false);
                    setRestaurant(data);
                })
                .catch((err) => {
                    setIsError(true);
                    console.error(err);
                });
        };

        fetchRestaurant();
    }, []);

    if (isError) return <ErrorNotice />;

    return (
        <>
            {restaurant && (
                <>
                    <div className="flex flex-col w-full justify-start items-center">
                        <HeroImage src={restaurant.coverImage} />
                        <RestaurantInfo restaurant={restaurant} />
                        <MenuLayout
                            menus={restaurant.menus}
                            restaurantId={restaurantId}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export const Route = createFileRoute('/$restaurantId')({
    component: RestaurantPage,
});

