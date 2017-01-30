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
    public class QuotationController : ApiController
    {
        static QuotationDAL quotationdb = new QuotationDAL();

        [HttpGet]
        public string Get()
        {
            var response = quotationdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
