using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class WageTechnicianDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;

        public int InsertData(WageTechnicianModels wageTechnician)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    DataSet ds = new DataSet();

                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ManpowerID", wageTechnician.ManpowerID);
                    cmd.Parameters.AddWithValue("@TechnicianID", wageTechnician.TechnicianID);
                    cmd.Parameters.AddWithValue("@Additionnal", wageTechnician.Additionnal != null ? wageTechnician.Additionnal : 0);
                    cmd.Parameters.AddWithValue("@Deduction", wageTechnician.Deduction != null ? wageTechnician.Deduction : 0);
                    cmd.Parameters.AddWithValue("@CreateBy", wageTechnician.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", wageTechnician.EditBy);
                    conObj.Open();
                    object obj = cmd.ExecuteScalar();
                    result = Convert.ToInt32(obj);
                    return result;
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

        public int UpdateData(WageTechnicianModels wageTechnician)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", wageTechnician.ID);
                    cmd.Parameters.AddWithValue("@ManpowerID", wageTechnician.ManpowerID);
                    cmd.Parameters.AddWithValue("@TechnicianID", wageTechnician.TechnicianID);
                    cmd.Parameters.AddWithValue("@Additionnal", wageTechnician.Additionnal);
                    cmd.Parameters.AddWithValue("@Deduction", wageTechnician.Deduction);
                    cmd.Parameters.AddWithValue("@CreateBy", wageTechnician.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", wageTechnician.EditBy);
                    conObj.Open();
                    result = cmd.ExecuteNonQuery();
                    return result;
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

        public DataSet SelectByTechnicianID(int id, DateTime FromDate, DateTime ToDate)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                        //Create
                        SqlCommand cmd = new SqlCommand("SP_WageTechnician_SelByTechnicianID", conObj);
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@ID", id);
                        cmd.Parameters.AddWithValue("@FromManDate", FromDate != null ? FromDate : DateTime.Now.AddYears(-2));
                        cmd.Parameters.AddWithValue("@ToManDate", ToDate != null ? ToDate : DateTime.Now.AddDays(1));// i will pass zero to MobileID beacause its Primary .
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

        public DataSet SelectByID(string TechnicianID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_WageTechnician_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TechnicianID", TechnicianID); // i will pass zero to MobileID beacause its Primary .
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