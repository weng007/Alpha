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
    public class JobOrderController : ApiController
    {
        public JobOrderDAL jobOrder = new JobOrderDAL();

        [HttpPost]
        public int Post(JobOrderModels jobOrderModel)
        {
            var response = jobOrder.InsertData(jobOrderModel);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = jobOrder.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrder.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderModels jobOrderModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrder.UpdateData(jobOrderModel);
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderModels jobOrderModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrder.DeleteData(jobOrderModel);
            return response;

        }
    }
}
