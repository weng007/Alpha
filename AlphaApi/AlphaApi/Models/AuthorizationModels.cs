using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class AuthorizationModels
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public int RoleID { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}