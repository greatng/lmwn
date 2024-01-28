import { Menu, MenuType } from './menus.models';

export const menusService = async (
    restaurantId: string,
    menuName: string,
    menuType: MenuType
): Promise<Menu> => {
    const apiEndpoint = `${process.env.DATA_ENDPOINT}/restaurants/${restaurantId}/menus/${menuName}/${menuType}.json`;
    const response = fetch(apiEndpoint)
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }

            return res.json();
        })
        .then((data: Menu) => {
            return data;
        });

    return response;
};

