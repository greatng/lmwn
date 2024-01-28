import { CacheData } from './cache.utils';

describe('cache.utils', () => {
    let cacheData: CacheData<any>;

    beforeEach(() => {
        cacheData = new CacheData<any>();

        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    describe('get', () => {
        it('should return undefined if key does not exist', () => {
            const result = cacheData.get('test');

            expect(result).toBeUndefined();
        });

        it('should return value if key exists and does not expired', () => {
            cacheData.set('test', 'test', 1000);

            jest.advanceTimersByTime(999);
            const result = cacheData.get('test');

            expect(result).toEqual('test');
        });

        it('should return undefined if key exists but has expired', () => {
            cacheData.set('test', 'test', 1000);

            jest.advanceTimersByTime(1001);
            const result = cacheData.get('test');

            expect(result).toBeUndefined();
        });
    });
});

