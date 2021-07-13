using System;
using System.Web.Mvc;
using VAPARS.Models.DomainUserService;

namespace VAPARS.Models.BusinessLayers
{
    /// <summary>
    /// Exception handler for global use.  Logs exception stack directly
    /// to NLog repository
    /// </summary>
    public class ValidRequestException : ActionFilterAttribute, IExceptionFilter
    {
        public DateTime AccessStart { get; set; }
        public void OnException(ExceptionContext filterContext)
        {
            var controller = filterContext.RouteData.Values["controller"];
            var action = filterContext.RouteData.Values["action"];

            filterContext.ExceptionHandled = true;
            Logs.Error($"ERROR : -> {controller}/{action}", filterContext.Exception);

            // evaluate if request is an ajax request call
            if (filterContext.HttpContext.Request.IsAjaxRequest())
            {
                // returns a page notification that alers the user(s)
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary
                {
                    {"Controller","Error"},
                    {"Action","AjaxError" },
                    {"Area","" }

                });


            }
            else
            {
                // returns the error page
                filterContext.Result = new RedirectToRouteResult(new System.Web.Routing.RouteValueDictionary
                {
                    {"Controller","Error" },
                    {"Action","Error500" },
                    {"Area","" }
                });
            }
        }

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            // start tracker page request
            AccessStart = DateTime.Now;
            base.OnActionExecuting(filterContext);
        }

        public override void OnResultExecuted(ResultExecutedContext filterContext)
        {
            // pass and store tracking 
            var controller = filterContext.RouteData.Values["controller"];
            var action = filterContext.RouteData.Values["action"];

            CommonService.RouteTracking($"{controller}/{action}", AccessStart);
            base.OnResultExecuted(filterContext);
        }
    }


    public class UserAccessFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var user = UserCache.GetUserData();
            filterContext.HttpContext.Items["userguid"] = user.Guid.ToString();
            base.OnActionExecuting(filterContext);
        }
    }


}
