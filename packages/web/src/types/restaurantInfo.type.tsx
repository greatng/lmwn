export type ActivePeriod = {
    open: string;
    close: string;
};

export type Restaurant = {
    name: string;
    id: number;
    coverImage: string;
    activeTimePeriod: ActivePeriod;
    menus: string[];
};

export enum RestaurantStatus {
    Open = 'เปิด',
    Closed = 'ปิด',
}

