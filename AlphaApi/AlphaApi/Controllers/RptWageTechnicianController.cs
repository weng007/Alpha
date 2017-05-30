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
    public class RptWageTechnicianController : ApiController
    {
        public RptWageTechnicianDAL RptWageTechnician = new RptWageTechnicianDAL();
        [HttpGet]
        public string Get(string DateSearch)
        {
            string[] str = DateSearch.Split('&');
            var response = RptWageTechnician.SelectByID(Convert.ToInt32(str[0]), Convert.ToDateTime(str[1]), Convert.ToDateTime(str[2]));
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
