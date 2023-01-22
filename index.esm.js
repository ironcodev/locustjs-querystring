import { isNumeric, hasBool, hasDate } from 'locustjs-base';

const parseQuery = function (url, convert = false, smart = true) {
	url = (url || '').toString().trim();
	
	const result = {};
	const iq = url.indexOf('?');
	const ih = url.indexOf('#');
	const hasHttp = url.substr(0,7).toLowerCase() == 'http://';
	const hasHttps = url.substr(0,8).toLowerCase() == 'https://';
	
	let arr = '';

	if (iq >= 0) {
		if (ih > 0) {
			if (iq < ih) {
				if (ih - iq - 1 > 0) {
					arr = url.substr(iq + 1, ih - iq - 1);
				}
			} else {
				if (!hasHttp && !hasHttps) {
					arr = url.substr(0, ih);
					
					if (arr.indexOf('=') < 0) {
						arr = ''
					}
				}
			}
		} else {
			arr = url.substr(iq + 1);
		}
	} else {
		if (ih >= 0) {
			if (!hasHttp && !hasHttps) {
				arr = url.substr(0, ih);
			}
		} else {
			if (!hasHttp && !hasHttps) {
				arr = url;
			}
		}
		
		if (arr.indexOf('=') < 0) {
			arr = ''
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
					
					if (value && convert) {
						if (isNumeric(value)) {
							let convertedValue = Number(value);

							if (isNaN(convertedValue)) {
								convertedValue = parseFloat(value)
							}

							if (isNaN(convertedValue)) {
								convertedValue = 0
							}

							result[key] = convertedValue
						} else if (hasBool(value)) {
							result[key] = value.toLowerCase() == 'true' ? true : false;
						} else if (hasDate(value)) {
							result[key] = Date.parse(value);
						} else {
							if (
								(value[0] == '{' && value[value.length - 1] == '}') ||
								(value[0] == '[' && value[value.length - 1] == ']')
								) {
								try {
									result[key] = JSON.parse(value);
								} catch {
									result[key] = value;
								}
							} else {
								if (smart) {
									if (value == 'null') {
										result[key] = null;
									} else if (value == 'undefined') {
										result[key] = undefined;
									} else {
										result[key] = value;
									}
								} else {
									result[key] = value;
								}
							}
						}
					} else {
						result[key] = value;
					}
				}
			}
		});
	}

	return result;
}

const createQuery = (obj, ignoreKeys) => Object.keys(obj)
		.filter(key => ignoreKeys == null || typeof ignoreKeys.indexOf !== 'function' || ignoreKeys.indexOf(key) < 0)
        .reduce((arr, key) => {
			const item = obj[key];

            if (Array.isArray(item)) {
                item.forEach(value => arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(value)))
            } else if (item !== undefined) {
                arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(item));
            }

            return arr;
        }, [])
        .join("&");

const QueryHelper = {
	parse: parseQuery,
	stringify: createQuery
}

export default QueryHelper;
export {
	createQuery,
	parseQuery
}