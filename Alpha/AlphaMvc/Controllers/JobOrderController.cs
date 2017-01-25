using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlphaMvc.Controllers
{
    public class JobOrderController : Controller
    {
        //
        // GET: /JobOrder/

        public ActionResult IndexJobOrder()
        {
            return View();
        }
        public ActionResult CreateJobOrder()
        {
            return View();
        }
        public ActionResult EditJobOrder()
        {
            return View();
        }

    }
}
