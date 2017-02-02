using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class JobOrderDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(JobOrderModels jobOrder)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobReference", "t1");
                    cmd.Parameters.AddWithValue("@JobNo", "t1");
                    cmd.Parameters.AddWithValue("@JobDate", jobOrder.JobDate);
                    cmd.Parameters.AddWithValue("@Car", "t1");
                    cmd.Parameters.AddWithValue("@SWorking", jobOrder.SWorking);
                    cmd.Parameters.AddWithValue("@EWorking", jobOrder.EWorking);
                    cmd.Parameters.AddWithValue("@JobBy", "t1");
                    cmd.Parameters.AddWithValue("@IssuedBy", "t1");
                    cmd.Parameters.AddWithValue("@TypeWorking", 5);
                    cmd.Parameters.AddWithValue("@JobStatus", 0);
                    cmd.Parameters.AddWithValue("@Detail", "t1");
                    cmd.Parameters.AddWithValue("@Customer", 5);
                    cmd.Parameters.AddWithValue("@Remark", "t1");
                    cmd.Parameters.AddWithValue("@Discount", 1000);
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

        public int UpdateData(JobOrderModels jobOrder)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrder.ID);
                    cmd.Parameters.AddWithValue("@JobReference", jobOrder.JobReference);
                    cmd.Parameters.AddWithValue("@JobNo", jobOrder.JobNo);
                    cmd.Parameters.AddWithValue("@JobDate", jobOrder.JobDate);
                    cmd.Parameters.AddWithValue("@Car", jobOrder.Car);
                    cmd.Parameters.AddWithValue("@SWorking", jobOrder.SWorking);
                    cmd.Parameters.AddWithValue("@EWorking", jobOrder.EWorking);
                    cmd.Parameters.AddWithValue("@JobBy", jobOrder.JobBy);
                    cmd.Parameters.AddWithValue("@IssuedBy", jobOrder.IssuedBy);
                    cmd.Parameters.AddWithValue("@TypeWorking", jobOrder.TypeWorking);
                    cmd.Parameters.AddWithValue("@JobStatus", jobOrder.JobStatus);
                    cmd.Parameters.AddWithValue("@Detail", jobOrder.Detail);
                    cmd.Parameters.AddWithValue("@Customer", jobOrder.Customer);
                    cmd.Parameters.AddWithValue("@Remark", jobOrder.Remark);
                    cmd.Parameters.AddWithValue("@Discount", jobOrder.Discount);
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

        public string DeleteData(JobOrderModels jobOrder)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrder.ID);
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
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_SelByID", conObj);
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
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Sel", conObj);
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