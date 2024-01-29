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
    discountedTimePeriod?: {
        begin: string;
        end: string;
    };
    sold: number;
    totalInStock: number;
};

export type FullMenu = {
    name: string;
    id: string;
    thumbnailImage?: string;
    fullPrice: number;
    discountedPercent: number;
    discountedTimePeriod?: {
        begin: string;
        end: string;
    };
    sold: number;
    totalInStock: number;
    largeImage?: string;
    options: {
        label: string;
        choices: {
            label: string;
        }[];
    }[];
};

