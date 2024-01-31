import { UtilityHelpers } from '../helpers/utilityHelpers';
import { useEffect, useState } from 'react';
import {
    FullMenu,
    HOTTEST,
    MenuOptions,
    MenuType,
    OUT_OF_STOCK,
    ShortMenu,
} from '../types/menuInfo.type';
import ErrorNotice from './ErrorNotice';
import { BACKEND_URL } from '../constants';

const MenuOption = ({ options }: { options: MenuOptions }) => {
    return (
        <div className="flex flex-col gap-2 m-2 overflow-y-scroll h-1/3">
            {options.map((option, idx) => (
                <div className="flex flex-col gap-2" key={idx}>
                    <div className="text-2xl">{option.label}</div>
                    <div className="flex flex-col gap-2 ml-2">
                        {option.choices.map((choice, idx) => (
                            <div className="flex text-lg" key={idx}>
                                <h1 className="flex-1">{choice.label}</h1>
                                <h1 className="flex-1 text-right">
                                    +100,000 บาท
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

const FullMenuModal = ({
    shortMenuData,
    setIsModalOpen,
    restaurantId,
    isDiscounted,
    isHottest,
}: {
    shortMenuData: ShortMenu;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    restaurantId: string;
    isDiscounted: boolean;
    isHottest: boolean;
}) => {
    const [menuData, setMenuData] = useState<FullMenu | undefined>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMenu = async () => {
            await fetch(
                `${BACKEND_URL}/api/restaurants/${restaurantId}/menus/${shortMenuData.id}/${MenuType.Full}`
            )
                .then((res) => {
                    if (!res.ok) throw new Error(res.statusText);

                    return res.json();
                })
                .then((data) => {
                    setIsError(false);
                    setMenuData(data);
                })
                .catch((err) => {
                    setIsError(true);
                    console.error(err);
                });
        };

        fetchMenu();
    }, []);

    return (
        <div
            data-testid="full-menu-modal"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center"
        >
            <div className="fixed top-1/3 left-0 w-full h-2/3 bg-slate-50 rounded-t-xl">
                <div className="flex justify-center items-center m-4">
                    <div className="flex-1"></div>
                    <h1 className="text-2xl flex">
                        {menuData?.name ?? shortMenuData.name}{' '}
                        {menuData?.totalInStock === 0 && (
                            <div
                                data-testid="out-of-stock"
                                className="text-red-500"
                            >
                                {OUT_OF_STOCK}
                            </div>
                        )}
                    </h1>
                    <div className="flex-1">
                        <div
                            data-testid="close-modal-btn"
                            className="w-10 h-10 ml-auto bg-cover bg-center cursor-pointer bg-[url('/assets/down.png')]"
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                        />
                    </div>
                </div>
                <div
                    className="flex justify-center items-center h-1/4 md:h-1/3 mt-4 w-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${menuData?.largeImage ?? '/assets/No_image_available.png'}`,
                    }}
                />
                {isError ? (
                    <ErrorNotice />
                ) : (
                    <>
                        <div className="flex justify-center items-center m-4">
                            <div className="flex-1 text-3xl">
                                {UtilityHelpers.getPriceFullText(
                                    menuData?.fullPrice ??
                                        shortMenuData.fullPrice,
                                    menuData?.discountedPercent ??
                                        shortMenuData.discountedPercent,
                                    isDiscounted
                                )}
                            </div>
                            <div className="flex-1 text-right text-3xl">
                                {isHottest && HOTTEST}
                            </div>
                        </div>
                        <hr className="w-full" />
                        <MenuOption options={menuData?.options ?? []} />
                    </>
                )}
            </div>
        </div>
    );
};

export default FullMenuModal;

