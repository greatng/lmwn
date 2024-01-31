import { memo, useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import forEach from 'lodash/forEach';
import { head } from 'lodash';

const MenuLayout = memo(
    ({ menus, restaurantId }: { menus: string[]; restaurantId: string }) => {
        const [menusSold, setMenusSold] = useState<Record<string, number>>({});
        const [hottestMenus, setHottestMenus] = useState<string[]>([]);
        const DELAY = 1000;

        useEffect(() => {
            const debouceHandler = debounce(
                (menusSold: Record<string, number>) => {
                    const accumulatedSold: Record<number, string[]> = {};
                    forEach(menusSold, (sold, id) => {
                        accumulatedSold[sold] = [
                            ...(accumulatedSold[sold] ?? []),
                            id,
                        ];
                    });

                    const sortedSold = Object.keys(accumulatedSold).sort(
                        (a, b) => Number(b) - Number(a)
                    );

                    if (head(sortedSold) && sortedSold.length > 1) {
                        setHottestMenus(
                            accumulatedSold[
                                parseInt(head(sortedSold) as string)
                            ]
                        );
                    }
                },
                DELAY
            );

            debouceHandler(menusSold);

            return () => {
                debouceHandler.cancel();
            };
        }, [menusSold]);

        return (
            <div
                data-testid="menu-layout"
                className="grid grid-flow-row gap-6 w-3/4 mt-8"
            >
                {menus.map((menu, idx) => {
                    return (
                        <MenuCard
                            menu={menu}
                            setMenusSold={setMenusSold}
                            restaurantId={restaurantId}
                            hottestMenus={hottestMenus}
                            key={idx}
                        />
                    );
                })}
            </div>
        );
    },
    isEqual
);

export default MenuLayout;

