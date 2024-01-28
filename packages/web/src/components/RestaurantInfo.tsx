import { TimeHelpers } from 'helpers/time.helpers';
import { Restaurant, RestaurantStatus } from 'types/restaurantInfo';

const getRestarantStatus = (activePeriod: {
    open: string;
    close: string;
}): RestaurantStatus => {
    const { open, close } = activePeriod;
    const isOpen = TimeHelpers.isInBetweenPeriod({ start: open, end: close });
    return isOpen ? RestaurantStatus.Open : RestaurantStatus.Closed;
};

export const RestaurantInfo = ({ restaurant }: { restaurant: Restaurant }) => {
    const { name, activeTimePeriod } = restaurant;
    const { open, close } = activeTimePeriod;

    return (
        <>
            <div className="flex flex-col w-full sm:w-3/4 md:w-3/5 items-start p-4">
                <div className="flex gap-3 items-center">
                    <h1 className={'text-3xl'}>{name}</h1>
                    <div
                        className={`${TimeHelpers.isInBetweenPeriod({ start: open, end: close }) ? 'bg-green-500' : 'bg-red-600'}
						flex justify-center items-center w-28 h-8 font-medium text-white rounded-md text-lg`}
                    >
                        {getRestarantStatus(activeTimePeriod)}
                    </div>
                </div>
            </div>
        </>
    );
};

