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
using Newtonsoft.Json.Linq;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class UserLoginController : ApiController
    {
        static UserLoginDAL Userdb = new UserLoginDAL();

        [HttpGet]
        public string Get(string password)
        {
            string[] str = password.Split('-');
            var response = Userdb.SelectByID(str[0],str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
