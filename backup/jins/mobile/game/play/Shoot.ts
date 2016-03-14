/// <reference path="../Game.ts" />
/// <reference path="selectBalloon/SelectBalloon.ts" />
/// <reference path="shootBalloon.ts" />
/// <reference path="ShootBtn.ts" />
/// <reference path="WishText.ts" />
/// <reference path="Avatar.ts" />
/// <reference path="Wish.ts" />

module play {
	export class Shoot extends PIXI.Container {
		static _Instance: Shoot;
		static toShoot:ShootBalloon;
		static onRequest:boolean = false
		constructor() {
			var _this = this;
			super();

			// alert('a');

			play.Play.state.on(function(data) {
				console.log(data);
				switch (data.state) {
					case PLAYSTATE.MAIN:
						break;
					case PLAYSTATE.ANIMATE:
						break;
					case PLAYSTATE.SHOOTPAGE:
						_this.show();
						break;
					case PLAYSTATE.SHOOT:
						
						_this.fnAnimate();
						_this.fnSaveBalloon();
						break;
				}
			});
			
		}
		static get Instance(): Shoot {
			if (!Shoot._Instance) {
				Shoot._Instance = new Shoot();
			}
			return Shoot._Instance;
		}
		show(){
			if (App.customBalloon){
				// id = App.customBalloon;
				this.addChild(new play.ShootBalloon(App.customBalloon))
			}else{
				this.addChild(new play.ShootBalloon(play.BalloonHolderContainer.selected));
			}
			
			this.addChild(play.Wish.Instance);
			play.Wish.Instance.addChild(Avatar.Instance);
		}
		fnAnimate() {
			var _this = this;
			TweenLite.to(this, 5, {
				y: -200 - _this.height
			});
		}

		fnSaveBalloon(){
			if(Shoot.onRequest) {
				return;
			}
			var id: number;
			var msg: string;
			if (App.customBalloon){
				id = App.customBalloon;
				msg = App.customBalloonText;
			}
			else{
				id = play.BalloonHolderContainer.selected;
				msg = balloonText[id - 1];
			}

			sdata.link = 'http://event.jins-cn.com/mobile?user_id=' + $('meta[name="user_id"]').attr('content')
			sdata.title = '点击' + $('meta[name="nickname"]').attr('content') + '的新年愿望，会有机会帮TA实现哦！'
			sdata.desc = '点击' + $('meta[name="nickname"]').attr('content') + '的新年愿望，会有机会帮TA实现哦！'
			console.log('fnSaveBalloon--', id, msg);
			if(id>=1&&id<=8){
				$.ajax({
					type: 'POST',
					url: '/api/jins/balloon',
					data: { balloon_id: id, user_id: $('meta[name="user_id"]').attr('content'), message: msg, isInteract: $('meta[name="isInteract"]').attr('content') },
					dataType: 'json',
					headers: {
						'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
					},
					success: function(data) {
						console.log('response data---', data);
						setTimeout(function() {
							Shoot.onRequest = true;
							jQuery('#userAvatar')[0].style.display = 'none';
							play.ShootBtn.Instance.visible = false;
							App.over();
						}, 1500);
					},
					error: function(xhr, type) {
						Shoot.onRequest = true;
						console.log('Ajax error!');
					}
				});
			}
			else{
				console.log('invalid balloon id!--')
			}
		
		}

	}
}