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
    public class IncomeMasterController : ApiController
    {
        public IncomeMasterDAL incomeMaster  = new IncomeMasterDAL();

        [HttpPost]
        public void Post(IncomeMasterModels incomeModel)
        {
            incomeMaster.InsertData(incomeModel);
        }

        [HttpGet]
        public string Get()
        {
            var response = incomeMaster.SelectAllData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = incomeMaster.SelectDataByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(IncomeMasterModels incomeModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.UpdateData(incomeModel);
            return response;

        }
        [HttpDelete]
        public string Delete(IncomeMasterModels incomeModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.DeleteData(incomeModel);
            return response;

        }
    }
}
