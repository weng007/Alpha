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
                    DataSet ds = new DataSet();

                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobRef", jobOrder.JobRef);
                    cmd.Parameters.AddWithValue("@JobNo", jobOrder.JobNo);
                    cmd.Parameters.AddWithValue("@JobDate", jobOrder.JobDate);
                    cmd.Parameters.AddWithValue("@Car", jobOrder.Car != null ? jobOrder.Car : "");
                    cmd.Parameters.AddWithValue("@SWorking", jobOrder.SWorking);
                    cmd.Parameters.AddWithValue("@EWorking", jobOrder.EWorking);
                    cmd.Parameters.AddWithValue("@JobBy", jobOrder.JobBy);
                    cmd.Parameters.AddWithValue("@IssuedBy", jobOrder.IssuedBy);
                    cmd.Parameters.AddWithValue("@TypeWorking", jobOrder.TypeWorking);
                    cmd.Parameters.AddWithValue("@ContactID", jobOrder.ContactID);
                    cmd.Parameters.AddWithValue("@CoWorkerID", jobOrder.CoWorkerID);
                    cmd.Parameters.AddWithValue("@JobStatus", jobOrder.JobStatus);
                    cmd.Parameters.AddWithValue("@Detail", jobOrder.Detail != null ? jobOrder.Detail : "");
                    //cmd.Parameters.AddWithValue("@CustID", jobOrder.CustID);
                    cmd.Parameters.AddWithValue("@Remark", jobOrder.Remark != null ? jobOrder.Remark : "");
                    cmd.Parameters.AddWithValue("@Discount", jobOrder.Discount);
                    cmd.Parameters.AddWithValue("@Price", jobOrder.Price);
                    cmd.Parameters.AddWithValue("@Cost", jobOrder.Cost);
                    cmd.Parameters.AddWithValue("@JobSite", jobOrder.JobSite != null ? jobOrder.JobSite : "");
                    cmd.Parameters.AddWithValue("@Location", jobOrder.Location != null ? jobOrder.Location : "");
                    cmd.Parameters.AddWithValue("@CreateBy", jobOrder.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", jobOrder.EditBy);
                    conObj.Open();
                    object obj = cmd.ExecuteScalar();
                    result = Convert.ToInt32(obj);
                    return result;
                    //conObj.Open();
                    //SqlDataAdapter adap = new SqlDataAdapter(cmd);
                    //adap.Fill(ds);
                    //conObj.Close();
                    //cmd.Parameters.Clear();
                    //return Convert.ToInt32(ds.Tables[1].Rows[0][0]);
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
                    cmd.Parameters.AddWithValue("@JobRef", jobOrder.JobRef);
                    cmd.Parameters.AddWithValue("@JobDate", jobOrder.JobDate);
                    cmd.Parameters.AddWithValue("@Car", jobOrder.Car != null ? jobOrder.Car : "");
                    cmd.Parameters.AddWithValue("@SWorking", jobOrder.SWorking);
                    cmd.Parameters.AddWithValue("@EWorking", jobOrder.EWorking);
                    cmd.Parameters.AddWithValue("@JobBy", jobOrder.JobBy);
                    cmd.Parameters.AddWithValue("@IssuedBy", jobOrder.IssuedBy);
                    cmd.Parameters.AddWithValue("@TypeWorking", jobOrder.TypeWorking);
                    cmd.Parameters.AddWithValue("@JobStatus", jobOrder.JobStatus);
                    cmd.Parameters.AddWithValue("@Detail", jobOrder.Detail != null ? jobOrder.Detail : "");
                    cmd.Parameters.AddWithValue("@ContactID", jobOrder.ContactID);
                    cmd.Parameters.AddWithValue("@CoWorkerID", jobOrder.CoWorkerID);
                    //cmd.Parameters.AddWithValue("@CustID", jobOrder.CustID);
                    cmd.Parameters.AddWithValue("@Remark", jobOrder.Remark != null ? jobOrder.Remark : "");
                    cmd.Parameters.AddWithValue("@Discount", jobOrder.Discount);
                    cmd.Parameters.AddWithValue("@Price", jobOrder.Price);
                    cmd.Parameters.AddWithValue("@Cost", jobOrder.Cost);
                    cmd.Parameters.AddWithValue("@JobSite", jobOrder.JobSite != null ? jobOrder.JobSite : "");
                    cmd.Parameters.AddWithValue("@Location", jobOrder.Location != null ? jobOrder.Location : "");
                    cmd.Parameters.AddWithValue("@EditBy", jobOrder.EditBy);
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

        public int DeleteData(JobOrderModels jobOrder)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_JobOrder_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", jobOrder.ID);
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

        public DataSet SelectCustomer(string id)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_GetCustomer", conObj);
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

        public DataSet SelectContact(string BDCID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_GetContact", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@BDCID", BDCID); // i will pass zero to MobileID beacause its Primary .
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
        public DataSet SelectContactByJobID(string JobID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_GetContactBYJobID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", JobID); // i will pass zero to MobileID beacause its Primary .
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