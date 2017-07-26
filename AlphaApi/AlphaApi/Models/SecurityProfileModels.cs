using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class SecurityProfileModels
    {
        public int ID { get; set; }

        public string Profile { get; set; }

        public int MenuID { get; set; }

        public int MenuDetailID { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}