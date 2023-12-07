exports.dataget = function (query,database) {
	post = [];
	queries = query.split(" ")
	try {
		for (let q of queries) {
			for (let [tag, value] of database) {
				if (tag.includes(q)) {
					if (!post.includes(value)) {
						post.push(value)
					}
				}
			}
		}
	} catch (err) {
		console.log(err)
	}
	if (post.length > 0) {
		return post.join('<br>')
	} else {
		return 'nothing'
	}
}