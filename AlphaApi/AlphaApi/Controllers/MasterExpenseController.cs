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
    public class MasterExpenseController : ApiController
    {
        static DBData EmpData = new DBData();

        private List<EmployeeModels> EmpList = new List<EmployeeModels>();

        
        [HttpPost]
        public string Post(MasterExpenseModels ME)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.InsertData(ME);
            return response;

        }

        [HttpGet]
        public string Get()
        {
            var response = EmpData.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        //public string GetByID(MasterExpenseModels ME)
        //{
        //    var response = EmpData.SelectAllDatabyID(ME);
        //    //var response = "GetID";
        //    return JsonConvert.SerializeObject(response, Formatting.Indented);
        //}
        public string Put(MasterExpenseModels ME)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.UpdateData(ME);
            return response;

        }
        [HttpDelete]
        public string Delete(MasterExpenseModels ME)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.DeleteData(ME);
            return response;

        }
        //[HttpGet]
        //public string Get()
        //{
        //    //calling DBData Class Method and storing Repsonse   
        //    var response = "Test";
        //    return response;

        //}

        //public string Get(int id)
        //{
        //    string result = string.Empty;
        //    switch (id)
        //    {
        //        case 1:
        //            result = "Orange";
        //            break;
        //        case 2:
        //            result = "Mangko";
        //            break;
        //    }

        //    return result;
        //}
    }
}
