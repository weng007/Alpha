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
    public class OTController : ApiController
    {
        public OTDAL OT = new OTDAL();
        [HttpGet]
        public string Get(string technician)
        {
            string[] str = technician.Split('&');
            string[] FDate = str[1].Split('/');
            int FDay = Convert.ToInt32(FDate[0]);
            int FMonth = Convert.ToInt32(FDate[1]);
            int FYear = Convert.ToInt32(FDate[2]);
            DateTime MDate = new DateTime(FYear, FMonth, FDay);

            var response = OT.SelectByID(Convert.ToInt32(str[0]), MDate, str[2], str[3]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
