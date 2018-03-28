const { fetchFromGitlabWiki } = require("./src/helper");
const crypto = require("crypto");
const uuid = require("uuid/v4");

exports.sourceNodes = (
	{ boundActionCreators },
	{ token, id, slugsToExclude }
) => {
	const { createNode } = boundActionCreators;
	return new Promise((resolve, reject) => {
		// we need a token to use this plugin
		if (token === undefined) {
			reject("token is undefined");
			return;
		}
		if (id === undefined) {
			reject("id is undefined");
			return;
		}
		if (Boolean(slugsToExclude) == false){
			slugsToExclude = [];
		}
		fetchFromGitlabWiki(id, token).then(response => {
			if (response.ok) {
				return response.json()
			} else {
				console.log("Something is wrong with the gitlab response")
			}
		}).then(data => {
			data.forEach(datum => {
				//handle each data point
				const { format, slug, content } = datum
				let found;
				slugsToExclude.forEach( slugToExclude =>{
					const exp = new RegExp(`^(${slugToExclude})`);
					// console.log('test:',slug, exp.test(slug));
					if (exp.test(slug)){
						// should exclude slug
						found = true;
					}
				});
				console.log(slug, found);
				if (format == 'markdown' && found != true ){
					
					createNode({
						slug: `/${slug}`,
						id: uuid(),
						parent: null,
						children: [],
						internal: {
							content,
							type: "GitlabWikiData",
							contentDigest: crypto
								.createHash(`md5`)
								.update(JSON.stringify(datum))
								.digest(`hex`),
							mediaType: "text/markdown"
						}
					});
				}
			})
		}).then(res=>{
			resolve();
		});
		
	});
}
