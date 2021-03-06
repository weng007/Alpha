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
    public class RequisitionController : ApiController
    {
        static RequisitionDAL Requisition = new RequisitionDAL();

        [HttpPost]
        public int Post(RequisitionModels requisitionModel)
        {
            var response = 0;

            if (requisitionModel.ID > 0)
            {
                response = Requisition.UpdateData(requisitionModel);
            }
            else
            {
                response = Requisition.InsertData(requisitionModel);
            }

            return response;
        }
    }
}
