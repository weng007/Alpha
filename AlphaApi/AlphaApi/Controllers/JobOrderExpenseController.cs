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
        [Serializable]
        [EnableCorsAttribute("*", "*", "*")]
    public class JobOrderExpenseController : ApiController
    {
        
        public JobOrderExpenseDAL jobOrderExpense = new JobOrderExpenseDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]

        public int Post(JobOrderExpenseModels jobOrderExpenseModel)
        {
            var response = 0;
            if (jobOrderExpenseModel.ID > 0)
            {
                response = jobOrderExpense.UpdateData(jobOrderExpenseModel);
            }
            else
            {
                response = jobOrderExpense.InsertData(jobOrderExpenseModel);
            }
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = jobOrderExpense.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrderExpense.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderExpenseModels jobOrderExpenseModel)
        {
            var response = 0;
            if (jobOrderExpenseModel.ID > 0)
            {
               response = jobOrderExpense.UpdateData(jobOrderExpenseModel);
            }
            else
            {
                response = jobOrderExpense.InsertData(jobOrderExpenseModel);
            }
                return response;

        }
        [HttpDelete]
        public string Delete(JobOrderExpenseModels jobOrderExpenseModel)
        {
            var response = jobOrderExpense.DeleteData(jobOrderExpenseModel);
            return response;

        }
    }
}
