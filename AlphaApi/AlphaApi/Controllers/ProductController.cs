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
    public class ProductController : ApiController
    {
        public ProductDAL EmpData = new ProductDAL();

        private List<EmployeeModels> EmpList = new List<EmployeeModels>();


        [HttpPost]
        public string Post(ProductModels PD)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.InsertData(PD);
            return response;

        }

        [HttpGet]
        public string Get()
        {
            var response = EmpData.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = EmpData.SelectDataByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public string Put(ProductModels PD)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.UpdateData(PD);
            return response;

        }
        [HttpDelete]
        public string Delete(ProductModels PD)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = EmpData.DeleteData(PD);
            return response;

        }
    }
}
