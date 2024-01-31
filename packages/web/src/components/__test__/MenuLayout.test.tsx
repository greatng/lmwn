import { ShortMenu } from '../../types/menuInfo.type';
import '@testing-library/jest-dom';
import MenuLayout from '../MenuLayout';
import { render, screen, act } from '@testing-library/react';

jest.mock('../../constants', () => ({
    BACKEND_URL: 'test_url',
}));

global.fetch = jest.fn();

const mockMenuData = {
    name: 'Test Menu',
    id: 'test-menu',
    fullPrice: 100,
} as ShortMenu;

it('should render menu layout and display all menu cards according to number of menus', async () => {
    (global.fetch as any).mockResolvedValue({
        ok: true,
        json: () => mockMenuData,
    });

    await act(async () => {
        render(
            <MenuLayout restaurantId="test-id" menus={['ต้มยำ', 'หมูกรอบ']} />
        );
    });

    const children = screen.getAllByTestId('menu-card');

    expect(children.length).toBe(2);
    expect(screen.getByTestId('menu-layout')).toBeInTheDocument();
});

