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
    public class JobOrderIncomeController : ApiController
    {
        public JobOrderIncomeDAL jobOrderIncome = new JobOrderIncomeDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]
       
        public int Post(JobOrderIncomeModels jobOrderIncomeModels)
        {
            var response = jobOrderIncome.InsertData(jobOrderIncomeModels);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = jobOrderIncome.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrderIncome.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderIncomeModels jobOrderIncomeModel)
        {  
            var response = jobOrderIncome.UpdateData(jobOrderIncomeModel);
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderIncomeModels jobOrderIncomeModel)
        {  
            var response = jobOrderIncome.DeleteData(jobOrderIncomeModel);
            return response;

        }
    }
}
