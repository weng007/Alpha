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
            var response = 0;

            if (jobOrderModel.ID > 0)
            {
                response = jobOrder.UpdateData(jobOrderModel);
            }
            else
            {
              response = jobOrder.InsertData(jobOrderModel);  
            }
            
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

        [HttpGet]
        public string Get(string BDCID)
        {
            var response = jobOrder.SelectCustomer(BDCID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string GetContact(string BID)
        {
            var response = jobOrder.SelectContact(BID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpGet]
        public string GetContactByJobID(string JobID)
        {
            var response = jobOrder.SelectContactByJobID(JobID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpPut]
        public int Put(JobOrderModels jobOrderModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrder.UpdateData(jobOrderModel);
            return response;

        }
        [HttpDelete]
        public int Delete(JobOrderModels jobOrderModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrder.DeleteData(jobOrderModel);
            return response;

        }
    }
}
