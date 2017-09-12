require('dotenv').config();

var GITHUB_USER = "dlepke";
var GITHUB_TOKEN = process.env.GITHUB_TOKEN;

var request = require('request');
var fs = require('fs');


var repoOwnerArg = process.argv[2];
var repoNameArg = process.argv[3];



console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {

  if (!repoOwner || !repoName) {
    console.log('Please enter a valid Owner and Repo entry');
    return;
  }

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
      downloadImageByURL(avatarURL, `avatars/avatarURL${i}`)
    }
  }
}


getRepoContributors(repoOwnerArg, repoNameArg, makeUseOfContributorList);



function downloadImageByURL(url, filePath) {
  request.get(url)
  .pipe(fs.createWriteStream(filePath));
}





