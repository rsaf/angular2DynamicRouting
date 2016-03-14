/// <reference path="Play.ts" />

module play {
	export class WishText extends PIXI.Text {
		static textWidth: number = 240;
		constructor(text: string = '') {
			var _this = this;

			super(text, { align: 'center', lineHeight: 58, font: "bold 45px Arial" });
			this.x = 170 - 130;
			this.y = 200;
			// console.log(this.width);
			// console.log(this.wordWrap(text));
			this.text = this.processText();
			// console.log(this.text);
			// this.updatePosition(text);
			this.updatePosition()
			// this.y = 250;
			// this.x = -110;
		}

		processText():string{

			// console.log(this.width);
			// console.log(WishText.textWidth);
			if(this.width > WishText.textWidth) {
				// code...
				var result = ' ' ;
				var i = 0;
				var j = 5;
				var temp;
				var text = this.text;
				while (true) {
					result = result + text.slice(i, j) + '\n ';
					i = j;
					temp = j + 5;
					if (text[temp]) {
						j = temp;
					}
					else {
						j = text.length;
						result = result + text.slice(i, j) + '\n ';
						break;
					}

				}
				return result;
			}
			return this.text;
		}


		updatePosition() {
			//console.log('wishtext', this.width, this.height);

			if(this.height < 60) {
				// code...
				this.y += 75;
			}else if(this.height < 180) {
				// code...
				this.y += 35;
			}else if(this.height < 240) {
				// code...
				this.y += 15;
			}
		}
	}
}