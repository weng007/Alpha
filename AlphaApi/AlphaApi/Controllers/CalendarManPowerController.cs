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
    public class CalendarManPowerController : ApiController
    {
        static CalendarManPowerDAL calendarManPower = new CalendarManPowerDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(string CalendarMonth)
        {
            string[] str = CalendarMonth.Split('&');
            var response = calendarManPower.SelectByID(Convert.ToInt32(str[0]), str[1] == "null" ? 0 : Convert.ToInt32(str[1]), str[2] == null ? "" : Convert.ToString(str[2]), str[3] == null ? "" : Convert.ToString(str[3]));
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
