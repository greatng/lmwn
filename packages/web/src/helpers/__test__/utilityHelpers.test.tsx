import { UtilityHelpers } from '../utilityHelpers';

describe('utilityhelpers', () => {
    describe('isInBetweenPeriod', () => {
        it('should return true if time is in between period', () => {
            jest.useFakeTimers().setSystemTime(
                new Date('2024-01-31').setHours(11)
            );

            expect(UtilityHelpers.isInBetweenPeriod('10:00', '13:00')).toBe(
                true
            );
        });

        it('should return false if time is out of period', () => {
            jest.useFakeTimers().setSystemTime(
                new Date('2024-01-31').setHours(14)
            );

            expect(UtilityHelpers.isInBetweenPeriod('10:00', '13:00')).toBe(
                false
            );
        });
    });

    describe('getDiscountedPrice', () => {
        it('should return discounted price', () => {
            expect(UtilityHelpers.getDiscountedPrice(100, 30)).toBe(70);
        });
    });

    describe('getPriceFullText', () => {
        it('should return full price text', () => {
            expect(UtilityHelpers.getPriceFullText(100, 30, false)).toBe(
                'ราคา 100 บาท'
            );
        });

        it('should return discounted price text', () => {
            expect(UtilityHelpers.getPriceFullText(100, 30, true)).toBe(
                'ราคา 70 บาท'
            );
        });
    });
});

