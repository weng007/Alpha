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
        static ExpenseMasterDAL expenseMasterdb = new ExpenseMasterDAL();

        [HttpPost]
        public void Post(ExpenseMasterModels expenseModel)
        {
            expenseMasterdb.InsertData(expenseModel);
        }

        [HttpGet]
        public string Get()
        {
            var response = expenseMasterdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = expenseMasterdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(string IsIncome)
        {
            string[] str = IsIncome.Split('&');
            var response = expenseMasterdb.GetPriceList(Convert.ToInt32(str[0]), str[1]);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(bool IsJobOrder)
        {
            var response = expenseMasterdb.GetExpense();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ExpenseMasterModels expenseModel)
        { 
            var response = expenseMasterdb.UpdateData(expenseModel);
            return response;
        }
        [HttpDelete]
        public int Delete(ExpenseMasterModels expenseModel)
        {  
            var response = expenseMasterdb.DeleteData(expenseModel);
            return response;
        }
    }
}
