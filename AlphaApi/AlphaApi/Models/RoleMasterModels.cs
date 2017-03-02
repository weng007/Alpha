﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AlphaApi.Models
{
    public class RoleMasterModels
    {
        public int ID { get; set; }

        public int RoleID { get; set; }

        public string IsView { get; set; }

        public string IsInsert { get; set; }

        public string IsUpdate { get; set; }

        public string IsDelete { get; set; }

        public int CreateBy { get; set; }

        public int EditBy { get; set; }

        public DataSet StoreAllData { get; set; }
    }
}