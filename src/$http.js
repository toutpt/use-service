function mergeFetchOptions(a = {}, b = {}) {
	const options = Object.assign({}, a, b);
	if (typeof options.body === 'object') {
		options.body = JSON.stringify(options.body);
	}
	if (a.headers && b.headers) {
		options.headers = Object.assign({}, a.headers, b.headers);
	}
	if (a.body && b.body) {
		throw new Error('Can t merge two fetch options.body');
	}
	return options;
}

export default function $http(notify) {
	this.errors = [];
	this.options = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	};
	this.mergeFetchOptions = mergeFetchOptions;
	this.fetch = (url, options) => fetch(url, this.mergeFetchOptions(this.options, options));

	// add convinent shortcuts
	this.get = (url, config = {}) => this.fetch(url, Object.assign({}, config, { method: 'GET' }));
	this.delete = (url, config = {}) =>
		this.fetch(url, Object.assign({}, config, { method: 'DELETE' }));
	this.head = (url, config = {}) => this.fetch(url, Object.assign({}, config, { method: 'HEAD' }));
	this.post = (url, data, config = {}) =>
		this.fetch(url, Object.assign({}, config, { method: 'POST', body: data }));
	this.put = (url, data, config = {}) =>
		this.fetch(url, Object.assign({}, config, { method: 'PUT', body: data }));
	this.patch = (url, data, config = {}) =>
		this.fetch(url, Object.assign({}, config, { method: 'PATCH', body: data }));
}

$http.$id = '$http';
