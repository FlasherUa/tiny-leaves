App.onResponse = (function () {


    /**
     *
     * Universal server responce gate
     * parsess all possible answers
     *
     *  - form on sumbit handler
     *  - init() ajax handler
     *
     * responses:
     * {"errors":[["emailExists",""]]}
     * {"registered":{USEr data}}
     * {"errors":[["noValue","Repeat Password"]]}
     * {"notLogged":null}
     *
     *
     */
    var onResponse = function (response) {
        var data = App.helpers.getResponse(response);
        if (!data) return;

        var key = App.helpers.key(data);

        //on response type
        switch (key) {

            //redirect to login/register page
            case "notLogged":
                delete App.userData;
                if (App.state !== "#addTask" && App.state !== "#login") doRoute("#taskList");
                break;

            //server found errors - show to  user
            case "errors":
                App.Controllers.Submit.clearAllErrors()
                App.Controllers.Submit.addFormErrors(data[key])
                break;

            case "taskAdded":
                //go to last added items
                App.Router("sort", ["id", "desc"])
                break;

            case "taskEdited":
                break;
                //load task list
            case "total":
            case "taskList":

                App.tasksData = data["taskList"];
                App.tasksTotal = data['total'];
                doRoute("#taskList");
                break;
            //user is logged - show user data
            case "logged":
                App.userData = data[key];
                doRoute("#taskList")
                break;

        }
    }

    /**
     * route helper
     * @param hash
     */
    var doRoute = function (hash) {
        if (window.location.hash !== hash) window.location.hash = hash
        else App.Router(hash)
    }

    return onResponse;


})()