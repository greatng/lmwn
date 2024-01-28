type ActivePeriod = {
    open: string;
    close: string;
};

export type Restaurant = {
    name: string;
    id: number;
    coverImage: string;
    activeTimePeriod: ActivePeriod;
    menu: string[];
};
