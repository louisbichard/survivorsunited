var url = require('url');

module.exports = {
	GET_params: function(req){
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		return query;
	}
};