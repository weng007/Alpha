using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class OTDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public DataSet SelectByID(int technicianID, DateTime manDate, string fromTime, string toTime, bool isBreak1, bool isBreak2)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_GetManPowerCost1", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@technicianID", technicianID); // i will pass zero to MobileID beacause its Primary .
                    cmd.Parameters.AddWithValue("@manDate", manDate);
                    cmd.Parameters.AddWithValue("@fromTime", fromTime);
                    cmd.Parameters.AddWithValue("@toTime", toTime);
                    cmd.Parameters.AddWithValue("@isBreak1", isBreak1);
                    cmd.Parameters.AddWithValue("@isBreak2", isBreak2);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch
                {
                    return ds;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
    }
}