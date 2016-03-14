/// <reference path="../play/Play.ts" />
/// <reference path="../intro/Intro.ts" />
/// <reference path="share/ShareBg.ts" />
/// <reference path="share/ShareCopy.ts" />
/// <reference path="../../util.ts" />
/// <reference path="EndingMessage.ts" />
/// <reference path="Thanks.ts" />
/// <reference path="Submit.ts" />
/// <reference path="PhoneInputText.ts" />
/// <reference path="Explosion.ts" />
/// <reference path="popUp/popUpBg.ts" />
/// <reference path="popUp/slideDown.ts" />
/// <reference path="LuckyBalloon.ts" />

module over {
	export class Over extends PIXI.Container {
		static _Instance: Over;
		constructor() {
			var _this = this;
			super();
			this.visible = false;
			this.addChild(over.share.ShareBg.Instance);
			this.addChild(over.share.ShareCopy.Instance);
			this.addChild(over.EndingMessage.Instance);
			this.addChild(over.Thanks.Instance);
			this.addChild(over.PhoneInputText.Instance);
			this.addChild(over.Thanks.Instance);
			this.addChild(over.Submit.Instance);
			this.addChild(over.popup.popUpBg.Instance);
			this.addChild(over.popup.SlideDown.Instance);
			this.addChild(over.LuckyBalloon.Instance);
			this.addChild(over.Explosion.Instance);

			App.EventState.on(function(aState) {
				switch (aState) {
					case STATE.PLAY:
						break;
					case STATE.OVER:
						_this.show();
						break;
				}
			});
		}
		
		static get Instance(): Over {
			if (!Over._Instance) {
				Over._Instance = new Over();
			}
			return Over._Instance;
		}

		show(){
			this.visible = true;
			var _this = this;
			over.share.ShareBg.Instance.fnShow();
			over.share.ShareCopy.Instance.fnShow();
		}

		fnShowRequirePhone() {
			over.share.ShareBg.Instance.visible = false;
			over.share.ShareCopy.Instance.visible = false;
			jQuery('#phoneInput')[0].style.display = 'block';
			over.Submit.Instance.visible = true;
			over.PhoneInputText.Instance.visible = true;
		}

		fnHideRequirePhone(){
			jQuery('#phoneInput')[0].style.display = 'none';
			over.Submit.Instance.visible = false;
			over.PhoneInputText.Instance.visible = false;
			this.showPopUp();
		}

		showPopUp() {
			over.popup.popUpBg.Instance.fnShow();
			over.popup.SlideDown.Instance.fnShow();
		}

		showEnding(){
			over.EndingMessage.Instance.visible = true;
			over.Thanks.Instance.visible = true;
		}

		showExplosion(){
			// alert('a');
			Explosion.Instance.show();
			console.log('=======================')
			$.ajax({
				type: 'POST',
				url: '/api/jins/luck',
				data: {
					user_id: $('meta[name="user_id"]').attr('content'),
					card_id: $('meta[name="card_id"]').attr('content'),
					isInteract: $('meta[name="isInteract"]').attr('content')
				},
				dataType: 'json',
				headers: {
					'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
				},
				success: function(data) {
					console.log(data);
				},
				error: function(xhr, type) {
					console.log('ajax error');
				}
			});
			// var _this = this;
			// this.addChild(over.Explosion.Instance);
			// setTimeout(function() {
			// 	_this.removeChild(over.Explosion.Instance);
			// 	_this.showEnding();
			// }, 5000);
		}
		addCard(){
			addCard();
		}

		showLuckyBalloon(){
			var _this = this;
			over.LuckyBalloon.Instance.visible = true;
			setTimeout(function() {
				over.LuckyBalloon.Instance.visible = false;
				_this.showExplosion();
			}, 2000);
		}
	}
}