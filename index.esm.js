const parseQuery = function (url) {
	const result = {};
	const iq = url.indexOf('?');
	const ih = url.indexOf('#');
	let arr;

	if (iq >= 0) {
		if (ih > 0) {
			if (ih - iq - 1 > 0) {
				arr = url.substr(iq + 1, ih - iq - 1);
			}
		} else {
			arr = url.substr(iq + 1);
		}
	} else {
		if (url.substr(0, 4).toLowerCase() != "http") {
			arr = url;
		}
	}

	if (arr) {
		arr.split('&').forEach(function (key_value_pair) {
			key_value_pair = (key_value_pair || '').trim();
			
			if (key_value_pair.length > 0) {
				const ei = key_value_pair.indexOf('=');
				
				if (ei < 0) {
					result[key_value_pair] = null;
				} else {
					const key = decodeURIComponent(key_value_pair.substr(0, ei).trim());
					const value = decodeURIComponent(key_value_pair.substr(ei + 1));
					
					result[key] = value;
				}
			}
		});
	}

	return result;
}

export {
	parseQuery
}