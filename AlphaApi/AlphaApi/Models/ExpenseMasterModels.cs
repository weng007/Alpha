using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class ExpenseMasterModels
    {
        public int ID { get; set; }

        public string Detail { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}