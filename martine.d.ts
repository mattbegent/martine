declare module 'martine' {
	export default class Martine {
	    static addCookie(name: string, value: any, days?: number): void;
	    static readCookie(name: string): any;
	    static removeCookie(name: string): void;
	    static debounce(fn: (Function), delay: number): () => void;
	    static each(value: any, cb: Function): void;
	    static escapeHtml(unsafe: string): string;
	    static extend(target: any, source: any): object;
	    static getParameter(name: string, locationSearch?: string): string;
	    static log(message: any): void;
	    static once(fn: Function, context: any): () => any;
	    static random(min: number, max: number): number;
	    static sample(arr: any[]): number;
	    static trigger(el: Element, eventName: string): void;
	    static query(expr: string, container?: any): HTMLElement;
	    static queryAll(expr: string, container?: any): HTMLElement[];
	    static viewport(): {
	        width: number;
	        height: number;
	    };
	    static ajax(url: string, data?: object, type?: string, cache?: boolean, headers?: any[]): any;
	    static isHidden(el: HTMLElement): boolean;
	    static inViewport(element: HTMLElement, thresholdOption?: number): boolean;
	    static poll(fn: Function, timeout?: number, interval?: number): any;
	    static logger(target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): TypedPropertyDescriptor<any>;
	}

}
