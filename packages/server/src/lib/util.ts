import assert from 'assert';
import crypto from 'crypto';

export function assertExists<T>(x: T | undefined | null, message?: string): T {
	if (x === null || typeof x === 'undefined') {
		assert.ok(x, message);
		/* istanbul ignore next: unreachable */
		throw new Error('null or undefined');
	}
	return x;
}

export function safeArray<T>(array: T[] | null | undefined): T[] {
	return array || [];
}
export function safeRecord<T extends Record<string, unknown>>(
	obj: T | null | undefined,
	defaultValue = {},
): Partial<T> {
	return obj || (defaultValue as Partial<T>);
}

export function safeNumber(num: number | null | undefined, defaultValue = 0): number {
	return num === null || typeof num === 'undefined' ? defaultValue : num;
}

export type Base64String = string;

export interface GlobalId {
	type: string;
	id: string;
}

export function base64(i: string): Base64String {
	return Buffer.from(i, 'utf8').toString('base64');
}

export function unbase64(i: Base64String): string {
	return Buffer.from(i, 'base64').toString('utf8');
}

export function toGlobalId(type: string, id: string): string {
	return base64([type, id].join(':'));
}
export function fromGlobalId(globalId: string): GlobalId {
	const unbasedGlobalId = unbase64(globalId);
	const delimiterPos = unbasedGlobalId.indexOf(':');
	return {
		type: unbasedGlobalId.substring(0, delimiterPos),
		id: unbasedGlobalId.substring(delimiterPos + 1),
	};
}

export function valueOrUndefined<T>(value: T | null | undefined): T | undefined {
	return value === null ? undefined : value;
}

export function safeStringCompare(a: string, b: string): boolean {
	const bufA = Buffer.from(a);
	const bufB = Buffer.from(b);

	return crypto.timingSafeEqual(bufA, bufB);
}
