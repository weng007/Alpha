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
    public class Requisition1Controller : ApiController
    {
        static Requisition1DAL Requisition1 = new Requisition1DAL();
        [HttpPost]
        public int Post(Requisition1Models Requisition1Model)
        {
            var response = 0;

            if (Requisition1Model.ID > 0)
            {
                response = Requisition1.UpdateData(Requisition1Model);
            }
            else
            {
                response = Requisition1.InsertData(Requisition1Model);
            }

            return response;
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = Requisition1.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [HttpGet]
        public string Get(int id)
        {
            var response = Requisition1.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
