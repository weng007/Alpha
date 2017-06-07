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
    public class SecurityProfileDetailController : ApiController
    {
        public SecurityProfileDetailDAL securityProfileDetail = new SecurityProfileDetailDAL();
        [HttpPost]
        public int Post(SecurityProfileDetailModels securityProfileDetailModel)
        {
            var response = securityProfileDetail.InsertData(securityProfileDetailModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = securityProfileDetail.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int SecurityID)
        {
            var response = securityProfileDetail.SelectBySecurityID(SecurityID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpPut]
        public int Put(SecurityProfileDetailModels securityProfileDetailModel)
        {
            var response = 0;

            if (securityProfileDetailModel.ID > 0)
            {
                response = securityProfileDetail.UpdateData(securityProfileDetailModel);
            }
            else
            {
                response = securityProfileDetail.InsertData(securityProfileDetailModel);
            }

            return response;

        }

        [HttpDelete]
        public string Delete(SecurityProfileDetailModels securityProfileDetailModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = securityProfileDetail.DeleteDetail(securityProfileDetailModel);
            return response;

        }
    }
}
