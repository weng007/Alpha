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

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = dbAction.SelectDataByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ExpenseMasterModels expenseModel)
        { 
            var response = dbAction.UpdateData(expenseModel);
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
