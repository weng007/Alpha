using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AlphaApi.DataAccessLayer;
using AlphaApi.Models;
using System.Data;
using System.Json;
using Newtonsoft.Json;
using System.Web.Http.Cors;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class JobOrderBorrowRefIDController : ApiController
    {
        static JobOrderBorrowDAL jobOrderBorrow = new JobOrderBorrowDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrderBorrow.SelectByRefID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(string Criteria)
        {
            var response = jobOrderBorrow.SelectByCriteria(Criteria);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
