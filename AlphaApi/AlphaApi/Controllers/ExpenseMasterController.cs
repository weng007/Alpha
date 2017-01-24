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
    public class ExpenseMasterController : ApiController
    {
        static DBData dbAction = new DBData();


        [HttpPost]
        public void Post(ExpenseMasterModels expenseModel)
        {
            dbAction.InsertData(expenseModel);
        }

        [HttpGet]
        public string Get()
        {
            var response = dbAction.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        
        [HttpGet]
        public string GetByID(int expenseID)
        {
            var response = dbAction.SelectDataByID(expenseID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public string Put(ExpenseMasterModels ME)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = dbAction.UpdateData(ME);
            return response;

        }
        [HttpDelete]
        public string Delete(ExpenseMasterModels expenseModel)
        {  
            var response = dbAction.DeleteData(expenseModel);
            return response;
        }
    }
}
