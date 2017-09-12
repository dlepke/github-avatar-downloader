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


  request(options, function(err, response, body_string) {
    if (err) {
      cb(err);
      return;
    }
    if (body_string.startsWith('Request')) {
      cb({message: body_string});
      return;
    }
    var body_obj = JSON.parse(body_string);       // this is the part that's in the assignment
    if (body_obj.message) {
      cb(body_obj);
      return;
    }
    // at this point we've caught all known errors; I guess things are probably okay!
    cb(undefined, body_obj);
  });
}


function makeUseOfContributorList(err, result) {
  if (err) {
    console.log("Errors: ", err);
  } else {
    for (var i in result) {
      var avatarURL = result[i].avatar_url;
      console.log(avatarURL);
    }
  }
}


getRepoContributors('jquery', 'jquery', makeUseOfContributorList);