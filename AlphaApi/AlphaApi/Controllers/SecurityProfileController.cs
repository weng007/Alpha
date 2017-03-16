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
    public class SecurityProfileController : ApiController
    {
        public SecurityProfileDAL roleMaster = new SecurityProfileDAL();
        [HttpPost]
        public int Post(SecurityProfileModels roleMasterModel)
        {
            var response = roleMaster.InsertData(roleMasterModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = roleMaster.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(SecurityProfileModels roleMasterModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = roleMaster.UpdateData(roleMasterModel);
            return response;

        }

        [HttpDelete]
        public string Delete()
        {
            //calling DBData Class Method and storing Repsonse   
            var response = roleMaster.DeleteDetail();
            return response;

        }
    }
}
