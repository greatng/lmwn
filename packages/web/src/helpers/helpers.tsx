export class Helpers {
    public static isInBetweenPeriod = (
        start: string,
        end: string,
        timeToCompare = new Date()
    ): boolean => {
        const thaiGmtOffset = 7 * 60;
        const localOffset = timeToCompare.getTimezoneOffset();
        const offsetInMs = (thaiGmtOffset + localOffset) * 60 * 1000;

        const [hh, mm] = start.split(':');
        const openTime =
            new Date().setHours(Number(hh), Number(mm)) + offsetInMs;
        const [hh2, mm2] = end.split(':');
        const closeTime =
            new Date().setHours(Number(hh2), Number(mm2)) + offsetInMs;

        if (
            timeToCompare.getTime() > openTime &&
            timeToCompare.getTime() < closeTime
        ) {
            return true;
        } else return false;
    };

    public static getDiscountedPrice = (
        fullPrice: number,
        discountedPercent: number
    ) => {
        return ((100 - discountedPercent) * fullPrice) / 100;
    };

    public static getPriceFullText = (
        fullPrice: number,
        discountedPercent: number,
        isDiscounted: boolean
    ) => {
        let price = fullPrice;

        if (isDiscounted) {
            price = Helpers.getDiscountedPrice(fullPrice, discountedPercent);
        }

        return Helpers.getPriceText(price);
    };

    private static getPriceText = (price: number) => `ราคา ${price} บาท`;
}

