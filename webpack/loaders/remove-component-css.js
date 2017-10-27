/**
 * Webpack loader that removes the addComponentCSS() code from the given file
 */

module.exports = function(source) {
    // Lets webpack know that the loader's output is cacheable
    this.cacheable && this.cacheable();

    var callback = this.async();
    if(!callback) {
        return source;
    }

    // Regural Expression that finds all the addComponentCSS calls and includes all the code);
    var re = /addComponentCSS\({[\s\S]*?}\);/g;

    // debugRegEx(source, re);

    callback(null, source.replace(re, '') );
};

//Note: Keep this function for debugging the regex
function debugRegEx(source, re) {
    r = re.exec(source);
    if (r) {
        console.log(r[0]);
    } else {
        console.log('no match');
    }
}
