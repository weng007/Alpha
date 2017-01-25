using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaMvc.Models
{
    public class IncomeMaster
    {
        public int ID { get; set; }

        [Display(Name = "Detail")]
        public string Detail { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}