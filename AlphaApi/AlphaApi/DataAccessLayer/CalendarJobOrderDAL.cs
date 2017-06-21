using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class CalendarJobOrderDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public DataSet SelectByMonth(int CalendarMonth, int IsTechnician, string FirstName, string LastName)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Carlendar", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@calendarMonth", CalendarMonth);
                    cmd.Parameters.AddWithValue("@IsTechnician", IsTechnician);
                    cmd.Parameters.AddWithValue("@FirstName", FirstName != null ? FirstName : "");
                    cmd.Parameters.AddWithValue("@LastName", LastName != null ? LastName : "");
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