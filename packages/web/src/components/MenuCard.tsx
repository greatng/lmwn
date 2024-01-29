import { TimeHelpers } from 'helpers/time.helpers';
import { memo } from 'react';
import { useEffect, useState } from 'react';
import { MenuType, ShortMenu } from 'types/menuInfo.type';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';

const getDiscountedPrice = (fullPrice: number, discountedPercent: number) => {
    return ((100 - discountedPercent) * fullPrice) / 100;
};

export const MenuCard = memo(
    ({
        menu,
        restaurantId,
        hottestMenus,
        setMenusSold,
    }: {
        menu: string;
        restaurantId: string;
        hottestMenus: string[];
        setMenusSold: React.Dispatch<
            React.SetStateAction<Record<string, number>>
        >;
    }) => {
        const [menuData, setMenuData] = useState<ShortMenu | null>({
            name: menu,
        } as ShortMenu);
        const [isDiscounted, setIsDiscounted] = useState(false);
        const [isHottest, setIsHottest] = useState(false);
        const BAHT = 'บาท';

        useEffect(() => {
            const fetchMenu = async () => {
                await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/restaurants/${restaurantId}/menus/${menu}/${MenuType.Short}`
                )
                    .then((res) => {
                        if (!res.ok) throw new Error(res.statusText);

                        return res.json();
                    })
                    .then((data) => {
                        setMenuData(data);
                        setMenusSold((prev) => ({
                            ...prev,
                            [data.id]: data.sold,
                        }));
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            };

            fetchMenu();
        }, []);

        useEffect(() => {
            setIsHottest(hottestMenus.includes(menuData?.id ?? ''));

            if (!menuData?.discountedTimePeriod) return;

            let interval = setInterval(
                () => {
                    if (menuData?.discountedTimePeriod) {
                        const { begin: start, end } =
                            menuData.discountedTimePeriod;
                        setIsDiscounted(
                            TimeHelpers.isInBetweenPeriod({ start, end })
                        );
                    }
                },
                1000 * 60 * 5
            );

            return () => {
                clearInterval(interval);
            };
        }, [menuData]);

        if (!menuData || isEmpty(menuData)) return <></>;

        return (
            <div className="flex items-center justify-center">
                <div
                    className={`rounded-lg w-[150px] h-[150px] bg-cover bg-center relative`}
                    style={{
                        backgroundImage: `url(${menuData?.thumbnailImage ?? '/assets/No_image_available.png'})`,
                    }}
                >
                    {isHottest && (
                        <div className="bg-red-600 text-white rounded-md p-1 absolute -right-2 -top-2">
                            เมนูขายดี
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start h-full w-1/2 m-4 gap-4 font-medium">
                    <h1>{menuData?.name}</h1>
                    <span className="inline-flex gap-1">
                        <h1 className={`${isDiscounted ? 'line-through' : ''}`}>
                            {menuData?.fullPrice} {BAHT}
                        </h1>
                        {isDiscounted && (
                            <h1>
                                {getDiscountedPrice(
                                    menuData.fullPrice,
                                    menuData.discountedPercent
                                )}{' '}
                                {BAHT}
                            </h1>
                        )}
                    </span>
                </div>
            </div>
        );
    },
    isEqual
);

