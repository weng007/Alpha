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
    public class MasterExpenseController : ApiController
    {
        static DBData dbAction = new DBData();
        
        [HttpPost]
        public void Post(MasterExpenseModels expenseModel)
        {
            dbAction.InsertData(expenseModel);
        }

        [HttpGet]
        public string Get()
        {
            var response = dbAction.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public string Put(MasterExpenseModels ME)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = dbAction.UpdateData(ME);
            return response;

        }
        [HttpDelete]
        public string Delete(MasterExpenseModels expenseModel)
        {  
            var response = dbAction.DeleteData(expenseModel);
            return response;
        }
    }
}
