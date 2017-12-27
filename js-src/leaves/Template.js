window.App || (window.App = {})//fix for module testing
var App = window.App
App.Template = (function () {

    /**
     * render template with data
     *
     * @param {String} tpl
     * @param {Object} data
     * @returns {String} HTML
     *
     */
    function templateParse(tpl, data) {
        var re = /%([^%]+)?%/g, match;
        while (match = re.exec(tpl)) {
            /*replaces %Key% with data.Key
            * if data.Key is undefined put "Key"
            * %=Key% no tramslation
            */
            var Key = match[1];
            var translate = true;
            if (Key.indexOf('=') === 0) {
                Key = Key.substr(1);
                translate = false;
            }
            var replace = data && typeof data[Key] !== "undefined" ? data[Key] : Key;
            //print string, parse object
            replace = (typeof replace === 'string' || replace instanceof String) ? replace : parseTemplObject(replace)
            //try to get translation
            if (translate) replace = App.Controllers.Pages.lang(replace)


            tpl = tpl.replace(match[0], replace);
        }
        return tpl;
    }

    function getTplTextById(id, data) {
        var el = document.getElementById(id),
            out = "";

        if (el) out = el.innerHTML;
        return out;

    }

    /**
     *
     * @param tplObj template object {"#templateID:{data Object}}
     * or array of templates Objects OR function that returns string
     * @return String HTML
     */
    function parseTemplObject(tplObj) {
        var parsed = "";
        if (tplObj.constructor === Array) {
            for (var i = 0; i < tplObj.length; i++) {
                parsed += parseTemplObject(tplObj[i])
            }
        }

        for (var tpl in tplObj) {
            if (!tplObj.hasOwnProperty(tpl)) continue;

            var sourceHTML = getTplTextById(tpl);
            parsed += templateParse(sourceHTML, tplObj[tpl]);
        }
        return parsed
    }

    /**
     * prints template
     * @param tplObj ObjectList of templates [templateName:dataFunction]
     * @param target #id of target node
     */
    var out = function (tplObj, target) {


        var parsed = parseTemplObject(tplObj);
        //console.log(parsed)
        //put HTML into target Node
        target || (target = "main");
        var targ = document.getElementById(target);
        if (targ) targ.innerHTML = parsed

    }

    return {out: out, parseTemplObject: parseTemplObject};

})()