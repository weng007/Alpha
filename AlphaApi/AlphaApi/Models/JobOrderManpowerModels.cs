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

        public DateTime ManDate { get; set; }

        public int ManDay { get; set; }

        public int ManTime { get; set; }

        public string FromHour { get; set; }

        public int FromMinute { get; set; }

        public string ToHour { get; set; }

        public int ToMinute { get; set; }

        public string TotalHours { get; set; }

        public double ManNormal { get; set; }

        public double ManPremium { get; set; }

        public double ManSpecial { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }
    }

    [Serializable]
    public class JobOrderManpowerModelsList
    {
        public List<JobOrderManpowerModels> jobOrderManpowerModelsList { get; set; }
    }
}