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
    public class CheckAuthorizationController : ApiController
    {
        static CheckAuthorizationDAL CheckAuthor = new CheckAuthorizationDAL();
        [HttpGet]
        public string Get(int id)
        {
            var response = CheckAuthor.SelectCheckRole(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        public string Get(string UserID)
        {
            var response = CheckAuthor.SelectFirstPage(Convert.ToInt32(UserID));
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}
