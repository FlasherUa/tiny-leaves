window.App || (window.App = {})//fix for module testing
App.Router = function (state, params) {

    switch (state) {
        case "submit":
            //must return value (Boolean) to controll form submit
            App.Controllers.Submit.submit(params[0], params[1]);
            return false;
            break;

        case "preview":
            //must return value (Boolean) to controll form submit
            App.Controllers.Submit.preview();
            return false;
            break;

        case "#taskList" :
            App.Controllers.Pages.listTaskController.print();
            break;

        case "#taskAdd" :
            App.Controllers.Pages.printAddTaskController();
            break;

        case "taskEdit" :
            App.Controllers.Pages.editTaskController(params);
            break;

        case "#taskInfo" :
            //if data not loaded
            if (typeof App.userData === "undefined") window.location.hash = "#login";
            else App.Controllers.Pages.printUserPageController();
            break;

        case "switchLang" :
            //switch language
            App.Controllers.Pages.switchLang();
            //re-render page
            App.Router(App.state)
            break;

        case "sort" :
            //load tasks list
            App.sort = params;
            App.curPage =0 ;
            App.Controllers.Pages.listTaskController.load();
        break;


        case "page" :
            //load tasks list
            App.curPage = params
            App.Controllers.Pages.listTaskController.load({page: params});
            break;

        case "#login" :
            App.Controllers.Pages.printLoginPageController();
            break;

        case "#logout" :
            App.Controllers.Pages.logout();
            break;

        default:
            App.Controllers.Pages.printLoading();
    }

    ;
};