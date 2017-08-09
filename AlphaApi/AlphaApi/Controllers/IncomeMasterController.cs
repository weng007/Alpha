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
    public class IncomeMasterController : ApiController
    {
        public IncomeMasterDAL incomeMaster  = new IncomeMasterDAL();

        [HttpPost]
        public void Post(IncomeMasterModels incomeModel)
        {
            incomeMaster.InsertData(incomeModel);
        }

        [HttpGet]
        //GetAll เพื่อแสดงlist ใช้หน้า IndexIncomeMaster
        public string Get()
        {
            var response = incomeMaster.SelectData();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        //GetจากID เพื่อ Edit ใช้หน้า Income Master
        public string Get(int id)
        {
            var response = incomeMaster.SelectByID(id);
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [HttpGet]
        //GetAll ใส่combobox Income มี Choose 
        public string Get(string IsJobOrder)
        {
            var response = incomeMaster.GetIncome();
            return JsonConvert.SerializeObject(response, Formatting.Indented);
        }

        [EnableCorsAttribute("*", "*", "*")]
        [HttpPut]
        public int Put(IncomeMasterModels incomeModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.UpdateData(incomeModel);
            return response;

        }
        [HttpDelete]
        public int Delete(IncomeMasterModels incomeModel)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = incomeMaster.DeleteData(incomeModel);
            return response;

        }
    }
}
