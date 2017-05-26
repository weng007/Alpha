﻿using System;
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
    public class RptBDCController : ApiController
    {
        public RptBDCDAL rptBDC = new RptBDCDAL();
        [HttpGet]
        public string Get(int id)
        {
            var response = rptBDC.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}