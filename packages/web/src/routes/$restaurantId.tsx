import { createFileRoute, useParams } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { Restaurant } from 'types/restaurantInfo';
import { HeroImage } from 'components/HeroImage';
import { RestaurantInfo } from 'components/RestaurantInfo';
import { Wrapper } from 'components/Wrapper';

const RestaurantPage = () => {
    const { restaurantId }: { restaurantId: string } = useParams({
        from: '/$restaurantId',
    });
    const [restaurant, setRestaurant] = useState<Restaurant | null>(null);

    useEffect(() => {
        const fetchRestaurant = async () => {
            await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/restaurants/${restaurantId}`
            )
                .then((res) => res.json())
                .then((data) => {
                    setRestaurant(data);
                })
                .catch((err) => {
                    console.error(err);
                });
        };

        fetchRestaurant();
    }, []);

    return (
        <>
            {restaurant && (
                <>
                    <HeroImage src={restaurant.coverImage} />
                    <Wrapper>
                        <RestaurantInfo restaurant={restaurant} />
                    </Wrapper>
                </>
            )}
        </>
    );
};

export const Route = createFileRoute('/$restaurantId')({
    component: RestaurantPage,
});

