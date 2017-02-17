using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.Models
{
    public class CalendarManpowerModels
    {
        public int ID { get; set; }
        public DataSet StoreAllData { get; set; }
    }
}