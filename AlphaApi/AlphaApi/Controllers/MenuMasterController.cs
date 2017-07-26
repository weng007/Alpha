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
    public class MenuMasterController : ApiController
    {
        public MenuMasterDAL MenuMaster = new MenuMasterDAL();
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get()
        {
            var response = MenuMaster.SelectMenuMaster();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(string Group)
        {
            var response = MenuMaster.SelectMenuMasterAll();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        public string Get(int ID)
        {
            var response = MenuMaster.SelectByGroupID(ID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
