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
    public class BDCController : ApiController
    {
        static BDC bDC = new BDC();

        [HttpPost]
        public string Post(BDCModels bDCModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = bDC.InsertData(bDCModel);
            return response;

        }

        [HttpGet]
        public string Get()
        {
            var response = bDC.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        //public string GetByID(ExpenseMasterModels ME)
        //{
        //    var response = EmpData.SelectAllDatabyID(ME);
        //    //var response = "GetID";
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}
        public string Put(BDCModels BDC)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = bDC.UpdateData(BDC);
            return response;

        }
        [HttpDelete]
        public string Delete(BDCModels BDC)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = bDC.DeleteData(BDC);
            return response;

        }
    }
}
