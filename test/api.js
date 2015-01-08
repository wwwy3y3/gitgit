var gitgit= require('../');
var path= require('path');
var repoDir= path.resolve(__dirname, './repo');
var FS= require('q-io/fs');
var file= 'test.txt';
/*
gitgit.init(repoDir)
	  //write file
	  .then(function (repo) {
	  		console.log('new repo');
	  		return FS.write(file, 'hello world');
	  }, thrown)
	  
	  // stage
	  .then(function (repo) {
	  		return gitgit.stage(repoDir, file);
	  }, thrown)

	  //first commit
	  .then(function () {
	  		var user= { name: 'wwwy3y3', email: 'wwwy3y3@gmail.com' };
	  		return gitgit.firstCommit(user, repoDir, 'init');
	  }, thrown)
	
	  // edit file
	   .then(function (repo) {
	  		return FS.append(file, 'how r u?');
	  }, thrown)
	
	   // stage
	  .then(function (repo) {
	  		return gitgit.stage(repoDir, file);
	  }, thrown)

	  // second commit
	  .then(function () {
	  		var user= { name: 'wwwy3y3', email: 'wwwy3y3@gmail.com' };
	  		return gitgit.commit(user, repoDir, 'second');
	  }, thrown)
*/

	FS.write(file, 'hello world')
	  .then(function (repo) {
	  		return gitgit.stage(repoDir, file);
	  }, thrown)
	  .done(function () {
	  		console.log('success');
	  },function (err) {
	  		console.log(err);
	  		console.log(err.stack);
	  })

var thrown= function (err) {
	throw err;
}