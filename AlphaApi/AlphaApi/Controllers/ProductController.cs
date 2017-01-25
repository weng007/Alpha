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
    public class ProductController : ApiController
    {
        public ProductDAL Productdb = new ProductDAL();

        [HttpPost]
        public string Post(ProductModels PD)
        {
            var response = Productdb.InsertData(PD);
            return response;

        }

        [HttpGet]
        public string Get()
        {
            var response = Productdb.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }


        [HttpGet]
        public string Get(int id)
        {
            var response = Productdb.SelectDataByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ProductModels PD)
        { 
            var response = Productdb.UpdateData(PD);
            return response;

        }
        [HttpDelete]
        public string Delete(ProductModels PD)
        {
            var response = Productdb.DeleteData(PD);
            return response;

        }
    }
}
