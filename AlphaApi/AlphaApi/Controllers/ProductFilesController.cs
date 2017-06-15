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
using System.IO;

namespace AlphaApi.Controllers
{
    [EnableCorsAttribute("*", "*", "*")]
    public class ProductFilesController : ApiController
    {
        public ProductFileDAL ProductFiledb = new ProductFileDAL();

        [HttpPost]
        public string UploadFiles(ProductFilesModels PF)
        {
            if (PF.AttachData != null)
            {

                byte[] AttachData = Convert.FromBase64String(PF.AttachData);
                string path;
                //string ImgName;
                //ImgName = PD.Img;
                //string[] str = ImgName.Split('/');
                path = System.Web.HttpContext.Current.Server.MapPath(PF.AttachPath);
                File.WriteAllBytes(path, AttachData);
            }

            var response = ProductFiledb.InsertData(PF);
            return response;
        }

        [HttpGet]
        public string Get(int refID)
        {
            var response = ProductFiledb.SelectByRefID(refID);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }
    }
}