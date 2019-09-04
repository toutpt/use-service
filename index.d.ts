
declare module 'use-service' {
    export function getService(id: any): any;
    export function registerService(idOrFn: any, value?: any): void;
    export function useService(id: any, ...args: any[]): any;
}
