var nodegit = require('nodegit');

// init
exports.init= function (repoDir) {
	return nodegit.Repository.init(repoDir);
}

// stage
// commit