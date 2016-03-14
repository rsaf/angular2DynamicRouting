module service {
	export class Util {
		constructor() { }
		static validatePhone(phone) {
			var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if (!myreg.test(phone)) {
				return false;
			}
			return true;
		}

		static getQueryVariable(variable) {
			var query = window.location.search.substring(1);
			var vars = query.split("&");
			for (var i = 0; i < vars.length; i++) {
				var pair = vars[i].split("=");
				if (pair[0] == variable) { return pair[1]; }
			}
			return '';
		}


	}
}

function isInArray(value, array) {
	return array.indexOf(value) > -1;
}