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
    public class IncomeMasterController : ApiController
    {
        public IncomeMaster incomeMaster  = new IncomeMaster();

        [HttpPost]
        public string Post(IncomeMasterModels incomeModel)
        {
            var response = incomeMaster.InsertData(incomeModel);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = incomeMaster.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        //public string GetByID(MasterExpenseModels ME)
        //{
        //    var response = EmpData.SelectAllDatabyID(ME);
        //    //var response = "GetID";
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}
        public string Put(IncomeMasterModels MN)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.UpdateData(MN);
            return response;

        }
        [HttpDelete]
        public string Delete(IncomeMasterModels MN)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.DeleteData(MN);
            return response;

        }
    }
}
