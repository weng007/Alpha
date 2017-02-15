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
    public class JobOrderReceiptController : ApiController
    {
        public JobOrderReceiptDAL jobOrderReceipt = new JobOrderReceiptDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]

        public int Post(JobOrderReceiptModels jobOrderReceiptModels)
        {
            var response = jobOrderReceipt.InsertData(jobOrderReceiptModels);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderReceiptModels jobOrderReceiptModel)
        {
            var response = jobOrderReceipt.UpdateData(jobOrderReceiptModel);
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderReceiptModels jobOrderReceiptModel)
        {
            var response = jobOrderReceipt.DeleteData(jobOrderReceiptModel);
            return response;

        }
    }
}
