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
        public string Get(string Datesearh)
        {
            string[] str = Datesearh.Split('|');
            string[] FDate = str[1].Split('/');
            int FYear = Convert.ToInt32(FDate[0]);
            int FMonth = Convert.ToInt32(FDate[1]);
            int FDay = Convert.ToInt32(FDate[2]);
            DateTime FromDate = new DateTime(FYear, FMonth, FDay);

            string[] TDate = str[2].Split('/');
            int TYear = Convert.ToInt32(TDate[0]);
            int TMonth = Convert.ToInt32(TDate[1]);
            int TDay = Convert.ToInt32(TDate[2]);
            DateTime ToDate = new DateTime(TYear, TMonth, TDay);

            var response = WageTechniciandb.SelectByTechnicianID(Convert.ToInt32(str[0]), FromDate, ToDate);
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
