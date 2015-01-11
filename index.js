var nodegit = require('nodegit');
var _= require('lodash');
var Q= require('q');
var path= require('path');

// init
exports.init= function (repoDir) {
	return nodegit.Repository.init(repoDir, 0);
}

// stage
exports.stage= function (repoDir, files) {
	if(!_.isArray(files))
		files= [files];
	
	// variables
	var repo;
	var index;

	// add to index
	// open repo
	return nodegit.Repository.open(repoDir)
		   .then(function (_repo) {
		   		repo= _repo;
		   		return repo;
		   })
		   .then(function() {
				return repo.openIndex();
			})
		   .then(function(indexResult) {
				index = indexResult;
				return index.read(1);
			})
		   .then(function () {
		   		var tasks= files.map(function (file) {
		   			return index.addByPath(file);
		   		})

		   		return Q.all(tasks);
		   })
		   .then(function() {
				return index.write();
		   })
}

// commit
// index write to tree
exports.commit= function (user, repoDir, message) {
	// variables
	var repo, index, oid;

	// commit
	return nodegit.Repository.open(repoDir)
		   .then(function (_repo) {
		   		repo= _repo;
		   })
		   .then(function() {
				return repo.openIndex();
			})
		   .then(function(indexResult) {
				index = indexResult;
				return index.read(1);
			})
		   .then(function () {
		   		//write to tree
		   		return index.writeTree();
		   })
		   .then(function(oidResult) {
				oid = oidResult;
				return nodegit.Reference.nameToId(repo, 'HEAD');
			})
			.then(function(head) {
				return repo.getCommit(head);
			})
			.then(function(parent) {
				var sig = nodegit.Signature.now(user.name, user.email);

				return repo.createCommit('HEAD', sig, sig, message, oid, [parent]);
			})
}

exports.firstCommit= function (user, repoDir, message) {
	// variables
	var repo, index;

	// commit
	return nodegit.Repository.open(repoDir)
		   .then(function (_repo) {
		   		repo= _repo;
		   })
		   .then(function() {
				return repo.openIndex();
			})
		   .then(function(indexResult) {
				index = indexResult;
				return index.read(1);
			})
		   .then(function () {
		   		//write to tree
		   		return index.writeTree();
		   })
			.then(function(oid) {
				var sig = nodegit.Signature.now(user.name, user.email);

				return repo.createCommit('HEAD', sig, sig, message, oid, []);
			})
}

exports.getCommit= function (repoDir, sha) {
	return nodegit.Repository.open(repoDir)
				.then(function(repo) {
				  return repo.getCommit(sha);
				})
				.then(function(_commit) {
					var commit= {};
					commit.sha= _commit.sha();
					commit.author= { name: _commit.author().name(), email: _commit.author().email() };
				  	commit.date= _commit.date();
				  	commit.message= _commit.message();

				  return commit;
				})
}