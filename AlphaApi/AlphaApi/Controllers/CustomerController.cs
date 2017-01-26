using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AlphaApi.DataAccessLayer;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class CustomerController : ApiController
    {
        static CustomerDAL customerdb = new CustomerDAL();

        [HttpGet]
        public string Get()
        {
            var response = customerdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
