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
        [HttpPost]
        public int Post(UserLoginModels userLoginModel)
        {
            var response = Userdb.InsertData(userLoginModel);
            return response;
        }

        [HttpGet]
        public string Get(string password)
        {
            string[] str = password.Split('&');
            var response = Userdb.Authenticate(str[0],str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string GetByID(string UserID)
        {
            string[] str = UserID.Split('&');
            var response = Userdb.SelectByID(Convert.ToInt32(str[0]), str[1], str[2]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string GetADByUserName(string UserName)
        {
            string[] str = UserName.Split('&');
            var response = Userdb.SelectADByUserName(str[0], str[1], str[2]);
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
        [HttpDelete]
        public string Delete(UserLoginModels userLoginModel)
        {
            var response = Userdb.DeleteData(userLoginModel);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
