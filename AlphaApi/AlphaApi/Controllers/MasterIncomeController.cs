﻿using System;
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
    public class MasterIncomeController : ApiController
    {
        public MasterIncome EmpData = new MasterIncome();

        private List<EmployeeModels> EmpList = new List<EmployeeModels>();


        [HttpPost]
        public string Post(MasterIncomeModels MN)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.InsertData(MN);
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
        public string Put(MasterIncomeModels MN)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.UpdateData(MN);
            return response;

        }
        [HttpDelete]
        public string Delete(MasterIncomeModels MN)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.DeleteData(MN);
            return response;

        }
    }
}
