var gitgit= require('../');
var path= require('path');
var repoDir= path.resolve(__dirname, './repo2');
var FS= require('q-io/fs');
var file= 'test.txt';
var filePath= repoDir+'/test.txt';

gitgit.init(repoDir)
	  //write file
	  .then(function (repo) {
	  		console.log('new repo');
	  		return FS.write(filePath, 'hello world');
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
	  		return FS.append(filePath, 'how r u?');
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

	  //done
	  .done(function () {
	  		console.log('success')
	  }, function (er) {
	  	console.log(er);
	  })

var thrown= function (err) {
	throw err;
}