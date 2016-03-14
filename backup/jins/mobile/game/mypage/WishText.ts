/// <reference path="MyPage.ts" />

module mypage {
	export class WishText extends PIXI.Text {
		bid;
		static textWidth: number = 8;
		constructor(text: string = '') {
			var _this = this;

			super(this.processText(text), { align: 'center', lineHeight: 45, font: "bold 30px Aria" });
			this.x = 170;
			this.y = 260;
			this.updatePosition(text);
		}


		processText(text: string): string {
			var result = text;
			if (text.length > WishText.textWidth) {

				result = ' ';
				var i = 0;
				var j = WishText.textWidth;
				var temp;
				while (true) {
					result = result + text.slice(i, j) + '\n ';
					i = j;
					temp = j + WishText.textWidth;
					if (text[temp]) {
						j = temp;
					}
					else {
						j = text.length;
						result = result + text.slice(i, j) + '\n ';
						break;
					}

				}
			}
			return result;
		}

		updatePosition(text: string) {
			if (text.length < WishText.textWidth) {
				this.x = 185;
				this.y = 270;

			}
			else if (text.length == WishText.textWidth) {
				this.y = 270;
			}

			else if (text.length > 2 * WishText.textWidth) {
				this.y = 230;
				this.x = 180;
			}
		}
	}
}