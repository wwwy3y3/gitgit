var gitgit= require('../');
var path= require('path');
var repoDir= path.resolve(__dirname, './repo');
var FS= require('q-io/fs');
var file= 'test.txt';
var file2= 'test2.txt';
var filePath= repoDir+'/test.txt';
var filePath2= repoDir+'/test2.txt';

gitgit.init(repoDir)
	  //write file
	  .then(function (repo) {
	  		return FS.write(filePath, 'hello world');
	  }, thrown)

	  .then(function (repo) {
	  		return FS.write(filePath2, 'hello world');
	  }, thrown)
	  
	  // stage
	  .then(function (repo) {
	  		return gitgit.stage(repoDir, [file, file2]);
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

	  .then(function (commitId) {
	  		return gitgit.getCommit(repoDir, commitId.toString());
	  })

	  //done
	  .done(function (commit) {
	  		console.log(commit)
	  }, function (er) {
	  	console.log(er);
	  })

var thrown= function (err) {
	throw err;
}

// read history
gitgit.getHistory(repoDir)
	  .done(function (commits) {
	  	console.log(commits)
	  }, function (err) {
	  	console.log(err);
	  })