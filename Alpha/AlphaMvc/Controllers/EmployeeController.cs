using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlphaMvc.Controllers
{
    public class EmployeeController : Controller
    {
        //
        // GET: /Employee/

        public ActionResult IndexEmployee()
        {
            return View();
        }
        public ActionResult EditEmployee()
        {
            return View();
        }
        public ActionResult CreateEmployee()
        {
            return View();
        }

        public ActionResult ExpiredEmployee()
        {
            return View();
        }
    }
}
