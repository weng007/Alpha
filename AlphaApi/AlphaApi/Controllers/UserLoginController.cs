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
    public class UserLoginController : ApiController
    {
        static UserLoginDAL Userdb = new UserLoginDAL();
        [HttpGet]
        public string Get()
        {
            var response = Userdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = Userdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
