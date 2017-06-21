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
    public class CalendarJobOrderController : ApiController
    {
        public CalendarJobOrderDAL calendarJob = new CalendarJobOrderDAL();
        [HttpGet]
        public string Get(string CalendarMonth)
        {
            string[] str = CalendarMonth.Split('&');
            var response = calendarJob.SelectByMonth(Convert.ToInt32(str[0]), Convert.ToInt32(str[1]), Convert.ToString(str[2]), Convert.ToString(str[3]));
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
