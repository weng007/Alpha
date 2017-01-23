using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlphaMvc.Controllers
{
    public class BorrowController : Controller
    {
        //
        // GET: /Borrow/

        public ActionResult Create()
        {
            return View();
        }
        public ActionResult Edit()
        {
            return View();
        }
    }
}
