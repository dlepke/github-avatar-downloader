var GITHUB_USER = "dlepke";
var GITHUB_TOKEN = 'bd7d12aeca4d275ca9537c311c7aa1a9c37155dc';



var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');



function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'LhL Project #1',
    }
  }


  request(options, function(err, response, body) {
    if (err) {
      console.log("inner inner inner function found an error; propagating it outward");
      cb(err);
      return;
    }
    // console.log(response);
    console.log(body);
  });
}



getRepoContributors('jquery', 'jquery', function(err, result) {
  console.log("Errors: ", err);
  console.log("Result: ", result);
});