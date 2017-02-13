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

        [HttpPost]    
        public int Post(JobOrderIncomeModels jobOrderIncomeModels)
        {
            var response = jobOrderIncome.InsertData(jobOrderIncomeModels);
            return response;
        }

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
