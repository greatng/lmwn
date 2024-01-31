import { ShortMenu } from '../../types/menuInfo.type';
import '@testing-library/jest-dom';
import { render, screen, act } from '@testing-library/react';
import MenuCard from '../MenuCard';

jest.mock('../../constants', () => ({
    BACKEND_URL: 'test_url',
}));

global.fetch = jest.fn();

const mockMenuData = {
    name: 'ต้มยำ',
    id: 'ต้มยำ',
    fullPrice: 100,
    totalInStock: 100,
} as ShortMenu;

it('should render menu card and display hottest badge', async () => {
    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockMenuData,
    });

    await act(async () => {
        render(
            <MenuCard
                menu="ต้มยำ"
                restaurantId="test-id"
                hottestMenus={['ต้มยำ', 'หมูกรอบ']}
                setMenusSold={jest.fn()}
            />
        );
    });

    expect(screen.getByTestId('menu-card')).toBeInTheDocument();
    expect(screen.getByTestId('hottest-badge')).toBeInTheDocument();
    expect(screen.queryByTestId('discount')).not.toBeInTheDocument();
    expect(screen.queryByTestId('full-menu-modal')).not.toBeInTheDocument();
});

it('should render menu card and not display hottest badge', async () => {
    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockMenuData,
    });

    await act(async () => {
        render(
            <MenuCard
                menu="ต้มยำ"
                restaurantId="test-id"
                hottestMenus={[]}
                setMenusSold={jest.fn()}
            />
        );
    });

    expect(screen.getByTestId('menu-card')).toBeInTheDocument();
    expect(screen.queryByTestId('hottest-badge')).not.toBeInTheDocument();
    expect(screen.queryByTestId('full-menu-modal')).not.toBeInTheDocument();
});

it('should render menu card and display out of stock badge', async () => {
    const mockOutOfStockMenuData = {
        ...mockMenuData,
        totalInStock: 0,
    } as ShortMenu;

    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockOutOfStockMenuData,
    });

    await act(async () => {
        render(
            <MenuCard
                menu="ต้มยำ"
                restaurantId="test-id"
                hottestMenus={['ต้มยำ', 'หมูกรอบ']}
                setMenusSold={jest.fn()}
            />
        );
    });

    expect(screen.getByTestId('menu-card')).toBeInTheDocument();
    expect(screen.getByText('(หมด)')).toBeInTheDocument();
    expect(screen.queryByTestId('full-menu-modal')).not.toBeInTheDocument();
});

it('should call open modal when click on menu card', async () => {
    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockMenuData,
    });

    await act(async () => {
        render(
            <MenuCard
                menu="ต้มยำ"
                restaurantId="test-id"
                hottestMenus={['ต้มยำ', 'หมูกรอบ']}
                setMenusSold={jest.fn()}
            />
        );
    });

    await act(async () => {
        screen.getByTestId('menu-card').click();
    });

    expect(screen.getByTestId('full-menu-modal')).toBeInTheDocument();
});

it('should render menu card and display discount if it is in that discount time', async () => {
    const mockDiscountedMenuData = {
        ...mockMenuData,
        discountedTimePeriod: {
            begin: '10:00',
            end: '12:59',
        },
    } as ShortMenu;

    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockDiscountedMenuData,
    });

    jest.useFakeTimers().setSystemTime(new Date('2024-01-31').setHours(11));

    await act(async () => {
        render(
            <MenuCard
                menu="ต้มยำ"
                restaurantId="test-id"
                hottestMenus={[]}
                setMenusSold={jest.fn()}
            />
        );
    });

    expect(screen.getByTestId('menu-card')).toBeInTheDocument();
    expect(screen.getByTestId('normal-price').className).toContain(
        'line-through'
    );
    expect(screen.getByTestId('discount-price')).toBeInTheDocument();
});

