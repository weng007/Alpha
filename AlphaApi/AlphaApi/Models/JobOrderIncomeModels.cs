using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System.Collections;
using System.Collections.Generic;

namespace AlphaApi.Models
{
    public class JobOrderIncomeModel
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int IncomeType { get; set; }

        public string UnitWeight { get; set; }

        public double Qty { get; set; }

        public double UnitPrice { get; set; }

        public double Amount { get; set; }
    }

    public class JobOrderIncomeModels : IEnumerable<JobOrderIncomeModel>
    {
        public DataSet StoreAllData { get; set; }

        List<JobOrderIncomeModel> mylist = new List<JobOrderIncomeModel>();

        public JobOrderIncomeModel this[int index]
        {
            get { return mylist[index]; }
            set { mylist.Insert(index, value); }
        }

        public IEnumerator<JobOrderIncomeModel> GetEnumerator()
        {
            return mylist.GetEnumerator();
        }

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return this.GetEnumerator();
        }
    }
}