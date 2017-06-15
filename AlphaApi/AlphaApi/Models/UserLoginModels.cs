using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class UserLoginModels
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        //public string Password { get; set; }
        //public string FirstName { get; set; }
        //public string LastName { get; set; }
        //public string Email { get; set; }
        //public int Status { get; set; }
        public int SecurityID { get; set; }
        public int CreateBy { get; set; }
        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}