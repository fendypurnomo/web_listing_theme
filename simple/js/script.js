var ignoreDirectories = 0; // set how many directories should be ignored
var ignoreAsNoLink = false; // set whether to ignore as 'do not display' or ignore as 'no links in breadcrub, but visible'
var path = document.location.pathname;
var segments = path.split("/");
var breadcrumbs = '/ ';
var currentPath = "/";
var homeLink = "/";

for (var i = 0; i < segments.length; i++) {
    if (segments[i] != '') {
        currentPath += segments[i] + '/';
        if (ignoreDirectories >= i) {
            if (ignoreAsNoLink) {
                breadcrumbs += segments[i] + ' / ';
            }
            homeLink = currentPath;
        } else {
            breadcrumbs += '<a href="' + currentPath + '">' + segments[i] + '</a> / ';
        }
    }
}

if (ignoreDirectories !== 0) {
    document.getElementById('homelink').setAttribute('href', homeLink);
    if (path === homeLink) {
        document.querySelector('tr:nth-child(3)').remove();
    }
}

var elements = document.getElementsByClassName('header__breadcrumbs');
var n = elements.length;
for (i = 0; i < n; i++) {
    var e = elements[i];
    e.innerHTML = breadcrumbs;
}