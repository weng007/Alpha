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
using System.IO;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ProductAdjustmentController : ApiController
    {
        public ProductAdjustmentDAL ProductAdjustdb = new ProductAdjustmentDAL();
        DataSet ds = null;
        [HttpPost]
        public string Post(ProductAdjustmentModels AdjustmentModel)
        {
            var response = ProductAdjustdb.InsertData(AdjustmentModel);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = ProductAdjustdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = ProductAdjustdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpGet]
        public string Get(string adjustID)
        {
            var response = ProductAdjustdb.SelectProductAdjust(adjustID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(ProductAdjustmentModels AdjustmentModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = ProductAdjustdb.UpdateData(AdjustmentModel);
            return response;

        }
        [HttpDelete]
        public int Delete(ProductAdjustmentModels AdjustmentModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = ProductAdjustdb.DeleteData(AdjustmentModel);
            return response;

        }
    }
}
