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
    public class AuthorizationController : ApiController
    {
        static AuthorizationDAL Autherdb = new AuthorizationDAL();
        DataSet ds = null;
        [HttpPost]
        public int Post(AuthorizationModels authorizationModel)
        {
            var response = 0;

            if (authorizationModel.ID > 0)
            {
                response = Autherdb.UpdateData(authorizationModel);
            }
            else
            {
                response = Autherdb.InsertData(authorizationModel);
            }

            return response;
        }

        [HttpGet]
        public string Get()
        {
            var response = Autherdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = Autherdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpDelete]
        public string Delete(AuthorizationModels authorizationModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = Autherdb.DeleteData(authorizationModel);
            return response;

        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(AuthorizationModels authorizationModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = Autherdb.DeleteDetail(authorizationModel);
            return response;

        }
    }
}
