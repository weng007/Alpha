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
    public class RoleMasterController : ApiController
    {
        public RoleMasterDAL roleMaster = new RoleMasterDAL();
        [HttpPost]
        public int Post(RoleMasterModels roleMasterModel)
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
        public int Put(RoleMasterModels roleMasterModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = roleMaster.UpdateData(roleMasterModel);
            return response;

        }
    }
}
