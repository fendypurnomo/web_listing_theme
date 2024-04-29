function joinUntil(array, index, separator) {
    var result = [];
    for (var i = 0; i <= index; i++) {
        result.push(array[i]);
    }
    return result.join(separator);
}

// Make all the icon links unfocusable with tab
var iconLinks = document.querySelectorAll('.indexcolicon a');
Array.prototype.forEach.call(iconLinks, function (link) {
    link.setAttribute('tabindex', '-1');
});

var path = document.querySelector('.js-path');
var pathParts = location.pathname.split('/');

// Removing empty strings
for (var i = 0; i < pathParts.length;) {
    if (pathParts[i]) {
        i++;
    } else {
        pathParts.splice(i, 1);
    }
}

var pathContents = ['<a href="/"></a>'];
Array.prototype.forEach.call(pathParts, function (part, index) {
    pathContents.push('<a href="/' + joinUntil(pathParts, index, '/') + '">' + decodeURI(part) + '</a>');
});
path.innerHTML = pathContents.join('/');