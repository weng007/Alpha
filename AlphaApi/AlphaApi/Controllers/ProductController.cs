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
using System.IO;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ProductController : ApiController
    {
        public ProductDAL Productdb = new ProductDAL();

        [HttpPost]
        public string Post(ProductModels PD)
        {
            
            //if (!Directory.Exists(yourD)
            //{
            //    Directory.CreateDirectory("",;
            //}
                
            if (PD.ImgData != null)
            {

                byte[] img = Convert.FromBase64String(PD.ImgData);
                //File.WriteAllBytes(@"D:\leadssoft\Picture", img);
            }

            var response = Productdb.InsertData(PD);
            return response;

        }

        [HttpGet]
        public string Get()
        {
            var response = Productdb.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
        [EnableCorsAttribute("*", "*", "*")]
        [HttpGet]
        public string Get(int id)
        {
            var response = Productdb.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(ProductModels PD)
        { 
            var response = Productdb.UpdateData(PD);
            return response;

        }
        [HttpDelete]
        public string Delete(ProductModels PD)
        {
            var response = Productdb.DeleteData(PD);
            return response;

        }
    }
}
