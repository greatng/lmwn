export enum MenuType {
    Full = 'full',
    Short = 'short',
}

export type Menu = ShortMenu | FullMenu;

export type ShortMenu = {
    name: string;
    id: string;
    thumbnailImage?: string;
    fullPrice: number;
    discountedPercent: number;
    discountedTimePeriod?: TimePeriod;
    sold: number;
    totalInStock: number;
};

export type FullMenu = {
    name: string;
    id: string;
    thumbnailImage?: string;
    fullPrice: number;
    discountedPercent: number;
    discountedTimePeriod?: TimePeriod;
    sold: number;
    totalInStock: number;
    largeImage?: string;
    options: MenuOptions;
};

export type TimePeriod = {
    begin: string;
    end: string;
};

export type MenuOptions = {
    label: string;
    choices: {
        label: string;
    }[];
}[];

export const HOTTEST = 'ยอดขายดีที่สุดในร้าน !';
export const BAHT = 'บาท';
export const OUT_OF_STOCK = '(หมด)';

