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

        public int ExpenseGroup { get; set; }

        public decimal PriceList { get; set; }

        public int Seq { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}