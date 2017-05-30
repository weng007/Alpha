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
    public class WageTechnicianController : ApiController
    {
        static WageTechnicianDAL WageTechniciandb = new WageTechnicianDAL();

        [HttpPost]
        public int Post(WageTechnicianModels wageTechnicianModel)
        {
            
            var response = 0;
            if (wageTechnicianModel.ID > 0)
            {
                response = WageTechniciandb.UpdateData(wageTechnicianModel);
            }
            else
            {
                response = WageTechniciandb.InsertData(wageTechnicianModel);
            }
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id, DateTime FromDate, DateTime ToDate)
        {
            var response = WageTechniciandb.SelectByTechnicianID(id, FromDate, ToDate);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(WageTechnicianModels wageTechnicianModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = WageTechniciandb.UpdateData(wageTechnicianModel);
            return response;

        }
    }
}
