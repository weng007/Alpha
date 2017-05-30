using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class RptWageTechnicianDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public DataSet SelectByID(int id, DateTime FromManDate, DateTime ToManDate)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RptWageTechnician", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id);
                    cmd.Parameters.AddWithValue("@FromManDate", FromManDate != null ? FromManDate : DateTime.Now.AddYears(-2));
                    cmd.Parameters.AddWithValue("@ToManDate", ToManDate != null ? ToManDate : DateTime.Now.AddDays(1));// i will pass zero to MobileID beacause its Primary .
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    return ds;
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    conObj.Close();
                }
            }
        }
    }
}