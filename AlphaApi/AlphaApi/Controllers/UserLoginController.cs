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
            string[] str = password.Split('&');
            var response = Userdb.SelectByUserName(str[0],str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = Userdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get()
        {
            var response = Userdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(bool mode)
        {
            //Get เฉพาะ User ที่ยังไม่ใส่ Role
            var response = Userdb.SelectByCondition();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public string Put(UserLoginModels userLoginModel)
        {
            var response = Userdb.UpdateData(userLoginModel);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
