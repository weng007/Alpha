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
using Newtonsoft.Json.Linq;

namespace AlphaApi.Controllers
{
    [Serializable]
    [EnableCorsAttribute("*", "*", "*")]
    public class JobOrderManPowerController : ApiController
    {
        public JobOrderManpowerDAL jobOrderManpower = new JobOrderManpowerDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]
        public int Post(JobOrderManpowerModels jobOrderManpowerModel)
        {
            var response = 0;
            response = jobOrderManpower.InsertData(jobOrderManpowerModel);
            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = jobOrderManpower.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int id)
        {
            var response = jobOrderManpower.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(string TypeWorking)
        {
            var response = jobOrderManpower.SelectByTypeWorking(TypeWorking);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderManpowerModels jobOrderManpowerModel)
        {
            var response = 0;
            if (jobOrderManpowerModel.ID > 0)
            {
                response = jobOrderManpower.UpdateData(jobOrderManpowerModel);
            }
            else
            {
                response = jobOrderManpower.InsertData(jobOrderManpowerModel);
            }
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderManpowerModels jobOrderManpowerModel)
        {
            var response = jobOrderManpower.DeleteData(jobOrderManpowerModel);
            return response;

        }
    }
}
