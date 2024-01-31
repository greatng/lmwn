import { render, screen, act } from '@testing-library/react';
import FullMenuModal from '../FullMenuModal';
import { FullMenu, ShortMenu } from '../../types/menuInfo.type';
import '@testing-library/jest-dom';

jest.mock('../../constants', () => ({
    BACKEND_URL: 'test_url',
}));

global.fetch = jest.fn();

const mockMenuData = {
    name: 'Test Menu',
    id: 'test-menu',
    fullPrice: 100,
} as ShortMenu;

const mockFullMenuData = {
    name: 'Test Menu',
    id: 'test-menu',
    fullPrice: 100,
    thumbnailImage: 'test_thumbnail_image',
    largeImage: 'test_large_image',
    discountedPercent: 80,
    sold: 0,
    totalInStock: 100,
    options: [
        {
            label: 'Test Option',
            choices: [
                {
                    label: 'Test Choice',
                },
            ],
        },
    ],
} as FullMenu;

it('should render FullMenuModal correctly and fetch data, and update full info after fetch completed, do not show hottest and out of stock', async () => {
    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockFullMenuData,
    });

    await act(async () => {
        render(
            <FullMenuModal
                shortMenuData={mockMenuData}
                setIsModalOpen={jest.fn()}
                restaurantId="test-restaurant"
                isDiscounted={false}
                isHottest={false}
            />
        );
    });

    expect(screen.getByTestId('full-menu-modal')).toBeInTheDocument();
    expect(screen.getByText('Test Menu')).toBeInTheDocument();
    expect(screen.getByText('ราคา 100 บาท')).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledWith(
        'test_url/api/restaurants/test-restaurant/menus/test-menu/full'
    );
    expect(screen.queryByTestId('out-of-stock')).not.toBeInTheDocument();
    expect(
        screen.queryByText('ยอดขายดีที่สุดในร้าน !')
    ).not.toBeInTheDocument();
    expect(screen.getByText('Test Option')).toBeInTheDocument();
    expect(screen.getByText('Test Choice')).toBeInTheDocument();
});

it('should render full FullMenuModal correctly , show red out of stock, and show hottest sales', async () => {
    const outOfStockData = {
        ...mockFullMenuData,
        totalInStock: 0,
    } as FullMenu;

    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => outOfStockData,
    });

    await act(async () => {
        render(
            <FullMenuModal
                shortMenuData={mockMenuData}
                setIsModalOpen={jest.fn()}
                restaurantId="test-restaurant"
                isDiscounted={false}
                isHottest={true}
            />
        );
    });

    const outOfStock = screen.getByTestId('out-of-stock');

    expect(screen.getByTestId('full-menu-modal')).toBeInTheDocument();
    expect(outOfStock.textContent).toBe('(หมด)');
    expect(outOfStock.className).toContain('text-red-500');
    expect(screen.getByText('ยอดขายดีที่สุดในร้าน !')).toBeInTheDocument();
});

it('should render full FullMenuModal, display error message and log error when fetch is error', async () => {
    (global.fetch as any).mockRejectedValue(new Error('test error'));
    jest.spyOn(console, 'error').mockImplementation(() => {});

    await act(async () => {
        render(
            <FullMenuModal
                shortMenuData={mockMenuData}
                setIsModalOpen={jest.fn()}
                restaurantId="test-restaurant"
                isDiscounted={false}
                isHottest={false}
            />
        );
    });

    expect(screen.getByTestId('full-menu-modal')).toBeInTheDocument();
    expect(screen.getByTestId('error-notice')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(new Error('test error'));
});

it('should call setIsModalOpen when click on close button', () => {
    const setIsModalOpen = jest.fn();

    render(
        <FullMenuModal
            shortMenuData={mockMenuData}
            setIsModalOpen={setIsModalOpen}
            restaurantId="test-restaurant"
            isDiscounted={false}
            isHottest={false}
        />
    );

    const closeButton = screen.getByTestId('close-modal-btn');

    closeButton.click();

    expect(setIsModalOpen).toHaveBeenCalledWith(false);
});

