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
using Newtonsoft.Json.Linq;

namespace AlphaApi.Controllers
{
    [Serializable]
    [EnableCorsAttribute("*", "*", "*")]
    public class JobOrderSaleOrderController : ApiController
    {
        public JobOrderSaleOrderDAL jobOrderSaleOrder = new JobOrderSaleOrderDAL();

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPost]

        public int Post(JobOrderSaleOrderModels jobOrderSaleOrderModel)
        {
            var response = 0;

                response = jobOrderSaleOrder.InsertData(jobOrderSaleOrderModel);
            return response;
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(JobOrderSaleOrderModels jobOrderSaleOrderModel)
        {
            var response = 0;
            if (jobOrderSaleOrderModel.ID > 0)
            {
                response = jobOrderSaleOrder.UpdateData(jobOrderSaleOrderModel);
            }
            else
            {
                response = jobOrderSaleOrder.InsertData(jobOrderSaleOrderModel);
            }
            return response;

        }
        [HttpDelete]
        public string Delete(JobOrderSaleOrderModels jobOrderSaleOrderModel)
        {
            var response = jobOrderSaleOrder.DeleteData(jobOrderSaleOrderModel);
            return response;

        }
    }
}
