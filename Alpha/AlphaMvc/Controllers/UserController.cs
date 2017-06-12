using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MymobilewalaMvc.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult IndexUser()
        {
            return View();
        }
        public ActionResult CreateUser()
        {
            return View();
        }
        public ActionResult EditUser()
        {
            return View();
        }
    }
}
