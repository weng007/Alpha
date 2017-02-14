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
    public class JobOrderInvoiceController : ApiController
    {
        public JobOrderInvoiceDAL jobOrderInvoice = new JobOrderInvoiceDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]

        public int Post(JobOrderInvoiceModels jobOrderInvoiceModels)
        {
            var response = jobOrderInvoice.InsertData(jobOrderInvoiceModels);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderInvoiceModels jobOrderInvoiceModel)
        {
            var response = jobOrderInvoice.UpdateData(jobOrderInvoiceModel);
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderInvoiceModels jobOrderInvoiceModel)
        {
            var response = jobOrderInvoice.DeleteData(jobOrderInvoiceModel);
            return response;

        }
    }
}
