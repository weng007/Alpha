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

        public int RequisitionID { get; set; }

        public int ProductID { get; set; }

        public double Amount { get; set; }

        public double ReturnGood { get; set; }

        public double ReturnLost { get; set; }

        public double ReturnRepair { get; set; }

        public double ReturnBad { get; set; }

        public string Remark { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}