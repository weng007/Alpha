using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using AlphaApi.DataAccessLayer;
using AlphaApi.Models;

namespace AlphaApi.Controllers
{
    public class EmployeeController : ApiController
    {
        static DBData EmpData = new DBData();
        private List<EmployeeModels> EmpList = new List<EmployeeModels>();


        public string Post(EmployeeModels MD)
        {
            //calling DBData Class Method and storing Repsonse   
            var response = "Test";
            return response;

        }

        public string Get(int id)
        {
            string result = string.Empty;
            switch (id)
            {
                case 1:
                    result = "Orange";
                    break;
                case 2:
                    result = "Mangko";
                    break;
            }

            return result;
        }

        //public IEnumerable<string> Get()
        //{
        //    string[] values = { "pipattra", "kumnuch" };
        //    return values;
        //}

        //public IEnumerable<EmployeeModels> GetEmployees(EmployeeModels MD)
        //{
        //    MD.StoreAllData = EmpData.SelectAllData();
        //    //EmpList.Add(new EmployeeModels(1, "Employee1", "Employee Department1", "9999888877","test"));
        //    return EmpList;
        //}

    }
}
