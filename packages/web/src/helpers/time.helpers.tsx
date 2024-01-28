export class TimeHelpers {
    public static isInBetweenPeriod = ({
        start,
        end,
        timeToCompare = new Date(),
    }: {
        start: string;
        end: string;
        timeToCompare?: Date;
    }): boolean => {
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
}

