using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class JobOrderBorrowModels
    {
        public int ID { get; set; }

        public int RefID { get; set; }

        public string Brand { get; set; }

        public string Serial { get; set; }

        public string Model { get; set; }

        public string Size { get; set; }

        public double Amount { get; set; }

        public double ReturnGood { get; set; }

        public double ReturnLost { get; set; }

        public double ReturnRepair { get; set; }

        public double ReturnBad { get; set; }

        public string Remark { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}