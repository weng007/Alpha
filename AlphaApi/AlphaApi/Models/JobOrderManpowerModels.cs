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
    [Serializable]
    public class JobOrderManpowerModels
    {
        public int ID { get; set; }

        public int JobID { get; set; }

        public int TechnicianID { get; set; }

        public int TechnicianType { get; set; }

        public DateTime ManpowerDate { get; set; }

        public int ManpowerDay { get; set; }

        public int ManpowerTime { get; set; }

        public int WorkingFromHour { get; set; }

        public int WorkingFromSecond { get; set; }

        public int WorkingToHour { get; set; }

        public int WorkingToSecond { get; set; }

        public double ManpowerTotalHours { get; set; }

        public double ManpowerNormal { get; set; }

        public double ManpowerPremium { get; set; }

        public double ManpowerSpecial { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }

    [Serializable]
    public class JobOrderManpowerModelsList
    {
        public List<JobOrderManpowerModels> jobOrderManpowerModelsList { get; set; }
    }
}