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

        //[HttpGet]
        //[Route("api/UserLogin/GetByID/{userName}/{Password}")]
        //public string GetByID(string userName, string Password)
        //{
        //    //string[] str = userName.Split('&');
        //    //var response = Userdb.Authenticate(str[0],str[1]);
        //    var response = Userdb.Authenticate(userName, Password);
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}
        [HttpGet]
        //[Route("api/UserLogin/{userName}/{Password}")]
        public string Get(string userName)
        {
            string[] str = userName.Split('&');
            var response = Userdb.Authenticate(str[0], str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        //Get AdInfo ตอน Update
        public string GetInfoByUserName1(string userName1)
        {
            
            string[] str = userName1.Split('&');
            var response = Userdb.GetInfoByUserName1(Convert.ToInt32(str[0]), str[1], str[2]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        //Get AdInfo ตอน Insert
        public string GetInfoByUserName2(string UserName2)
        {
            string[] str = UserName2.Split('&');
            var response = Userdb.GetInfoByUserName2(str[0], str[1], str[2]);
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
