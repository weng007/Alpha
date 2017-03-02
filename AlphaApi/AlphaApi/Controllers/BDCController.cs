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
        static BDCDAL BDCdb = new BDCDAL();
        DataSet ds = null;
        [HttpPost]
        public int Post(BDCModels BDCModel)
        {
            var response = BDCdb.InsertData(BDCModel);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = BDCdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = BDCdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(bool isLastVersion)
        {
            DataSet ds = new DataSet();

            if (isLastVersion)
            {
                ds = BDCdb.SelectData();
            }
            else
            {
                ds = BDCdb.SelectByLastVersion();
            }

            return JsonConvert.SerializeObject(ds, Formatting.Indented);
        }

        [HttpPut]
        public int Put(BDCModels BDC)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = BDCdb.UpdateData(BDC);
            return response;

        }
        [HttpDelete]
        public string Delete(BDCModels BDC)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = BDCdb.DeleteData(BDC);
            return response;

        }
    }
}
