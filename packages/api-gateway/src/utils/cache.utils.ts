export class CacheData<T> {
    private cache: Map<string, any> = new Map();
    private cacheTTL: Map<string, number> = new Map();

    public get(key: string): T | undefined {
        const now = Date.now();
        const expirationTime = this.cacheTTL.get(key);

        if (expirationTime && now > expirationTime) {
            this.cache.delete(key);
            this.cacheTTL.delete(key);
            return undefined;
        }

        return this.cache.get(key);
    }

    public set(key: string, value: T, ttl: number): void {
        this.cacheTTL.set(key, Date.now() + ttl);
        this.cache.set(key, value);
    }
}

