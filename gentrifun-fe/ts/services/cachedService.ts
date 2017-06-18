export default class CachedService {
    cache: any;
    constructor() {
        this.cache = {};
    }

    set(key: string, value: any): any {
        this.cache[key] = value;
    }

    get(key: string): any {
        return this.cache[key];
    }
}