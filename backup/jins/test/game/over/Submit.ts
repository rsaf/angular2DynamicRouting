/// <reference path="../../App.ts" />
/// <reference path="Over.ts" />

module over {
	export class Submit extends PIXI.Sprite {
		static _Instance: Submit;
		constructor() {
			var _this = this;
			super(PIXI.Texture.fromFrame('Submit.png'));
			// this.visible = false;
			this.x = (App.width - this.width) / 2;
			this.y = App.height - this.height-100;
			this.buttonMode = this.interactive = true;
			this.on("click", this.tapped).on("tap", this.tapped);

		}
		static get Instance(): Submit {
			if (!Submit._Instance) {
				Submit._Instance = new Submit();
			}
			return Submit._Instance;
		}

		tapped(){
				var phoneNuber = parseInt(jQuery('#phoneInput input').val());

				if (util.Util.validatePhone(phoneNuber)) {
					$.ajax({
						type: 'GET',
						url: '/api/jins/phone',
						data: { phone: phoneNuber, user_id: $('meta[name="user_id"]').attr('content')},
						dataType: 'json',
						headers: {
							'X-CSRF-TOKEN': $('meta[name="_token"]').attr('content')
						},
						success: function(data) {
							console.log('response data---', data);
							jQuery('#phoneInput input').val(' ');
							over.Over.Instance.fnHideRequirePhone();
						},
						error: function(xhr, type) {
							// jQuery('#phoneInput input').val(' ');
							// over.Over.Instance.fnHideRequirePhone();
							// console.log('Ajax error!');
							// alert(xhr);
							jQuery('#phoneInput input').val(' ');
							over.Over.Instance.fnHideRequirePhone();
						}
					});
				}
				else {
					alert('手机号码无效, 请重新输入');
					jQuery('#phoneInput input').val(' ');
				}
		}
	}
}