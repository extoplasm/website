exports.authenticate = function(username, password, users) {
	if (users.has(username)) {
		if (users.get(username) == password) {
			return true
		}
	}
}