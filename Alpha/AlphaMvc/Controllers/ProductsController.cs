using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AlphaMvc.Controllers
{
    public class ProductsController : Controller
    {
        //
        // GET: /Products/

        public ActionResult IndexProducts()
        {
            return View();
        }
        public ActionResult CreateProducts()
        {
            return View();
        }
        public ActionResult EditProducts()
        {
            return View();
        }
    }
}
