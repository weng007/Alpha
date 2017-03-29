using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderManpowerDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderManpowerModels jobOrderManpower)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderManpower_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", jobOrderManpower.JobID);
                    cmd.Parameters.AddWithValue("@TechnicianID", jobOrderManpower.TechnicianID);
                    cmd.Parameters.AddWithValue("@TechnicianType", jobOrderManpower.TechnicianType);
                    cmd.Parameters.AddWithValue("@ManpowerDate", jobOrderManpower.ManpowerDate);
                    cmd.Parameters.AddWithValue("@ManpowerDay", jobOrderManpower.ManpowerDay);
                    cmd.Parameters.AddWithValue("@ManpowerTime", jobOrderManpower.ManpowerTime);
                    cmd.Parameters.AddWithValue("@WorkingFrom", jobOrderManpower.WorkingFrom);
                    cmd.Parameters.AddWithValue("@WorkingTo", jobOrderManpower.WorkingTo);
                    cmd.Parameters.AddWithValue("@ManpowerTotalHours", jobOrderManpower.ManpowerTotalHours);
                    cmd.Parameters.AddWithValue("@ManpowerNormal", jobOrderManpower.ManpowerNormal);
                    cmd.Parameters.AddWithValue("@ManpowerPremium", jobOrderManpower.ManpowerPremium);
                    cmd.Parameters.AddWithValue("@ManpowerSpecial", jobOrderManpower.ManpowerSpecial);
                    cmd.Parameters.AddWithValue("@CreateBy", jobOrderManpower.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", jobOrderManpower.EditBy);
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

        public int UpdateData(JobOrderManpowerModels jobOrderManpower)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderManpower_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderManpower.ID);
                    cmd.Parameters.AddWithValue("@JobID", jobOrderManpower.JobID);
                    cmd.Parameters.AddWithValue("@TechnicianID", jobOrderManpower.TechnicianID);
                    cmd.Parameters.AddWithValue("@TechnicianType", jobOrderManpower.TechnicianType);
                    cmd.Parameters.AddWithValue("@ManpowerDate", jobOrderManpower.ManpowerDate);
                    cmd.Parameters.AddWithValue("@ManpowerDay", jobOrderManpower.ManpowerDay);
                    cmd.Parameters.AddWithValue("@ManpowerTime", jobOrderManpower.ManpowerTime);
                    cmd.Parameters.AddWithValue("@WorkingFrom", jobOrderManpower.WorkingFrom);
                    cmd.Parameters.AddWithValue("@WorkingTo", jobOrderManpower.WorkingTo);
                    cmd.Parameters.AddWithValue("@ManpowerTotalHours", jobOrderManpower.ManpowerTotalHours);
                    cmd.Parameters.AddWithValue("@ManpowerNormal", jobOrderManpower.ManpowerNormal);
                    cmd.Parameters.AddWithValue("@ManpowerPremium", jobOrderManpower.ManpowerPremium);
                    cmd.Parameters.AddWithValue("@ManpowerSpecial", jobOrderManpower.ManpowerSpecial);
                    cmd.Parameters.AddWithValue("@EditBy", jobOrderManpower.EditBy);
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

        public string DeleteData(JobOrderManpowerModels jobOrderManpower)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderManpower_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrderManpower.JobID);
                    conObj.Open();
                    result = cmd.ExecuteScalar().ToString();
                    return result;
                }
                catch
                {
                    return result = "";
                }
                finally
                {
                    conObj.Close();
                }
            }
        }

        public DataSet SelectByID(int id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderManpower_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // i will pass zero to MobileID beacause its Primary .
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
        public DataSet SelectData()
        {
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrderManpower_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
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