using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class RequisitionDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;

        public int InsertData(RequisitionModels requisition)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RequisitionProduct_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@JobID", requisition.JobID);
                    cmd.Parameters.AddWithValue("@Taker", requisition.Taker);
                    cmd.Parameters.AddWithValue("@Giver", requisition.Giver);
                    cmd.Parameters.AddWithValue("@IsReturn", requisition.IsReturn);
                    cmd.Parameters.AddWithValue("@CreateBy", requisition.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", requisition.EditBy);
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
        public int UpdateData(RequisitionModels requisition)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RequisitionProduct_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", requisition.ID);
                    cmd.Parameters.AddWithValue("@Taker", requisition.Taker);
                    cmd.Parameters.AddWithValue("@Approver", requisition.Approver);
                    cmd.Parameters.AddWithValue("@Giver", requisition.Giver);
                    cmd.Parameters.AddWithValue("@IsApprove", requisition.IsApprove);
                    cmd.Parameters.AddWithValue("@IsReturn", requisition.IsReturn);
                    cmd.Parameters.AddWithValue("@EditBy", requisition.EditBy);
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
        public string DeleteData(RequisitionModels requisition)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RequisitionProduct_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", requisition.ID);
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
    }
}