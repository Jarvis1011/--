import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AlgorithmService {

	constructor() { }

	//將字串進行雜湊
	hashCode(str: string): number {
		var hash = 0, i, chr, len;
		if (str.length === 0) return hash;
		for (i = 0, len = str.length; i < len; i++) {
			chr = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	//取得唯一碼
	uuid(): string {
		var i, random;
		var result: string = '';
		for (i = 0; i < 32; i++) {
			random = Math.random() * 16 | 0;
			if (i === 8 || i === 12 || i === 16 || i === 20) {
				result += '-';
			}
			result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
				.toString(16);
		}
		return result;
	}

	//加密
	encrypt(str: string): string {
		if (!str) return "";

		var key = 16;

		var enc = "";
		for (var i = 0; i < str.length; i++) {
			var a = str.charCodeAt(i);
			var b = a ^ key;
			enc = enc + String.fromCharCode(b);
		}
		return enc;
	}
	//解密
	decrypt(str: string | null): string {
		return str ? this.encrypt(str) : "";
	}

}
