import { render, screen } from '@testing-library/react';
import { Restaurant, RestaurantStatus } from '../../types/restaurantInfo.type';
import RestaurantInfo from '../RestaurantInfo';

it('should display the restaurant open status', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-31').setHours(11));

    const mockRestaurant = {
        name: 'Test Restaurant',
        activeTimePeriod: {
            open: '10:00',
            close: '22:00',
        },
    } as Restaurant;

    render(<RestaurantInfo restaurant={mockRestaurant} />);

    const restaurantStatus = screen.getByTestId('restaurant-status');

    expect(screen.getByText('Test Restaurant')).toBeTruthy();
    expect(restaurantStatus.textContent).toBe(RestaurantStatus.Open);
    expect(restaurantStatus.className).toContain('bg-green-500');
});

it('should display the restaurant close status', () => {
    jest.useFakeTimers().setSystemTime(new Date('2024-01-31').setHours(9));

    const mockRestaurant = {
        name: 'Test Restaurant',
        activeTimePeriod: {
            open: '10:00',
            close: '22:00',
        },
    } as Restaurant;

    render(<RestaurantInfo restaurant={mockRestaurant} />);

    const restaurantStatus = screen.getByTestId('restaurant-status');

    expect(screen.getByText('Test Restaurant')).toBeTruthy();
    expect(restaurantStatus.textContent).toBe(RestaurantStatus.Closed);
    expect(restaurantStatus.className).toContain('bg-red-600');
});

