using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.Models
{
    public class CalendarJobOrderModels
    {
        public int ID { get; set; }

        public string JobNo { get; set; }

        public DateTime JobDate { get; set; }

        public DateTime SWorking { get; set; }

        public DateTime EWorking { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}