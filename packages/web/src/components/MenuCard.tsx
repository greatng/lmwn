import { UtilityHelpers } from '../helpers/utilityHelpers';
import { useEffect, useState } from 'react';
import {
    BAHT,
    HOTTEST,
    MenuType,
    OUT_OF_STOCK,
    ShortMenu,
} from '../types/menuInfo.type';
import isEmpty from 'lodash/isEmpty';
import FullMenuModal from './FullMenuModal';
import { BACKEND_URL } from '../constants';

const MenuCard = ({
    menu,
    restaurantId,
    hottestMenus,
    setMenusSold,
}: {
    menu: string;
    restaurantId: string;
    hottestMenus: string[];
    setMenusSold: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}) => {
    const [menuData, setMenuData] = useState<ShortMenu | null>({
        name: menu,
    } as ShortMenu);
    const [isDiscounted, setIsDiscounted] = useState(false);
    const [isHottest, setIsHottest] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            await fetch(
                `${BACKEND_URL}/api/restaurants/${restaurantId}/menus/${menu}/${MenuType.Short}`
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
        if (!menuData?.discountedTimePeriod) return;

        let interval = setInterval(
            () => {
                if (menuData?.discountedTimePeriod) {
                    const { begin: start, end } = menuData.discountedTimePeriod;
                    setIsDiscounted(
                        UtilityHelpers.isInBetweenPeriod(start, end)
                    );
                }
            },
            1000 * 60 * 5
        );

        return () => {
            clearInterval(interval);
        };
    }, [menuData]);

    useEffect(() => {
        if (!menuData?.id) return;

        setIsHottest(hottestMenus.includes(menuData.id));
    }, [hottestMenus, menuData]);

    if (!menuData || isEmpty(menuData)) return <></>;

    return (
        <>
            {isModalOpen && (
                <FullMenuModal
                    shortMenuData={menuData}
                    setIsModalOpen={setIsModalOpen}
                    restaurantId={restaurantId}
                    isDiscounted={isDiscounted}
                    isHottest={isHottest}
                />
            )}
            <div
                data-testid="menu-card"
                className="flex items-center justify-center cursor-pointer"
                onClick={() => {
                    setIsModalOpen(!isModalOpen);
                }}
            >
                <div
                    className={`rounded-lg w-[150px] h-[150px] bg-cover bg-center relative`}
                    style={{
                        backgroundImage: `url(${menuData?.thumbnailImage ?? '/assets/No_image_available.png'})`,
                    }}
                >
                    {isHottest && (
                        <div
                            data-testid="hottest-badge"
                            className="bg-red-600 text-white rounded-md p-1 absolute -right-2 -top-2 animate-bounce"
                        >
                            {HOTTEST}
                        </div>
                    )}
                </div>
                <div className="flex flex-col items-start h-full w-1/2 ml-4 gap-4 font-medium">
                    <h1>{menuData?.name}</h1>
                    <span className="inline-flex gap-1">
                        <h1 className={`${isDiscounted ? 'line-through' : ''}`}>
                            {menuData?.fullPrice} {BAHT}
                        </h1>
                        {isDiscounted && (
                            <h1>
                                {UtilityHelpers.getDiscountedPrice(
                                    menuData.fullPrice,
                                    menuData.discountedPercent
                                )}{' '}
                                {BAHT}
                            </h1>
                        )}
                        {menuData?.totalInStock === 0 && (
                            <div className="text-red-500">{OUT_OF_STOCK}</div>
                        )}
                    </span>
                </div>
            </div>
        </>
    );
};

export default MenuCard;

