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
                    cmd.Parameters.AddWithValue("@ManDate", jobOrderManpower.ManDate);
                    cmd.Parameters.AddWithValue("@ManDay", jobOrderManpower.ManDay);
                    cmd.Parameters.AddWithValue("@ManTime", jobOrderManpower.ManTime);
                    cmd.Parameters.AddWithValue("@FromHour", jobOrderManpower.FromHour);
                    //cmd.Parameters.AddWithValue("@FromMinute", jobOrderManpower.FromMinute);
                    cmd.Parameters.AddWithValue("@ToHour", jobOrderManpower.ToHour);
                    //cmd.Parameters.AddWithValue("@ToMinute", jobOrderManpower.ToMinute);
                    cmd.Parameters.AddWithValue("@Break1", jobOrderManpower.Break1);
                    cmd.Parameters.AddWithValue("@Break2", jobOrderManpower.Break2);
                    cmd.Parameters.AddWithValue("@Break3", jobOrderManpower.Break3);
                    cmd.Parameters.AddWithValue("@TotalHours", jobOrderManpower.TotalHours);
                    cmd.Parameters.AddWithValue("@NormalDay", jobOrderManpower.NormalDay);
                    cmd.Parameters.AddWithValue("@ManNormal", jobOrderManpower.ManNormal);
                    cmd.Parameters.AddWithValue("@ManPremium", jobOrderManpower.ManPremium);
                    cmd.Parameters.AddWithValue("@ManPremium2", jobOrderManpower.ManPremium2);
                    cmd.Parameters.AddWithValue("@ManSpecial", jobOrderManpower.ManSpecial);
                    cmd.Parameters.AddWithValue("@ManJobType", jobOrderManpower.ManJobType);
                    cmd.Parameters.AddWithValue("@ManJobPrice", jobOrderManpower.ManJobPrice);
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
                    cmd.Parameters.AddWithValue("@ManDate", jobOrderManpower.ManDate);
                    cmd.Parameters.AddWithValue("@ManDay", jobOrderManpower.ManDay);
                    cmd.Parameters.AddWithValue("@ManTime", jobOrderManpower.ManTime);
                    cmd.Parameters.AddWithValue("@FromHour", jobOrderManpower.FromHour);
                    //cmd.Parameters.AddWithValue("@FromMinute", jobOrderManpower.FromMinute);
                    cmd.Parameters.AddWithValue("@ToHour", jobOrderManpower.ToHour);
                    cmd.Parameters.AddWithValue("@Break1", jobOrderManpower.Break1);
                    cmd.Parameters.AddWithValue("@Break2", jobOrderManpower.Break2);
                    cmd.Parameters.AddWithValue("@Break3", jobOrderManpower.Break3);
                    //cmd.Parameters.AddWithValue("@ToMinute", jobOrderManpower.ToMinute);
                    cmd.Parameters.AddWithValue("@TotalHours", jobOrderManpower.TotalHours);
                    cmd.Parameters.AddWithValue("@NormalDay", jobOrderManpower.NormalDay);
                    cmd.Parameters.AddWithValue("@ManNormal", jobOrderManpower.ManNormal);
                    cmd.Parameters.AddWithValue("@ManPremium", jobOrderManpower.ManPremium);
                    cmd.Parameters.AddWithValue("@ManPremium2", jobOrderManpower.ManPremium2);
                    cmd.Parameters.AddWithValue("@ManSpecial", jobOrderManpower.ManSpecial);
                    cmd.Parameters.AddWithValue("@ManJobType", jobOrderManpower.ManJobType);
                    cmd.Parameters.AddWithValue("@ManJobPrice", jobOrderManpower.ManJobPrice);
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

        public DataSet SelectByTypeWorking(string TypeWorking)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ManJob_SelByTypeWorking", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@TypeWorking", TypeWorking); // i will pass zero to MobileID beacause its Primary .
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