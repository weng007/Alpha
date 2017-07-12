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
    public class JobOrderBorrowController : ApiController
    {
        static JobOrderBorrowDAL jobOrderBorrow = new JobOrderBorrowDAL();

        [HttpPost]
        public int Post(JobOrderBorrowModels jobOrderBorrowModel)
        {
            var response = jobOrderBorrow.InsertData(jobOrderBorrowModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = jobOrderBorrow.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrderBorrow.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(string ProductID)
        {
            var response = jobOrderBorrow.SelectProductAmount(ProductID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderBorrowModels jobOrderBorrowModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrderBorrow.UpdateData(jobOrderBorrowModel);
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderBorrowModels jobOrderBorrowModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = jobOrderBorrow.DeleteData(jobOrderBorrowModel);
            return response;

        }
    }
}
