using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class RoleMasterDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(RoleMasterModels roleMasterModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RoleMaster_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RoleID", roleMasterModel.RoleID);
                    cmd.Parameters.AddWithValue("@IsView", roleMasterModel.IsView);
                    cmd.Parameters.AddWithValue("@IsInsert", roleMasterModel.IsInsert);
                    cmd.Parameters.AddWithValue("@IsUpdate", roleMasterModel.IsUpdate);
                    cmd.Parameters.AddWithValue("@IsDelete", roleMasterModel.IsDelete);
                    cmd.Parameters.AddWithValue("@MenuTypeID ", roleMasterModel.MenuTypeID);
                    cmd.Parameters.AddWithValue("@CreateBy", roleMasterModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", roleMasterModel.EditBy);
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
        public int UpdateData(RoleMasterModels roleMasterModel)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_RoleMaster_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", roleMasterModel.ID);
                    cmd.Parameters.AddWithValue("@RoleID", roleMasterModel.RoleID);
                    cmd.Parameters.AddWithValue("@IsView", roleMasterModel.IsView);
                    cmd.Parameters.AddWithValue("@IsInsert", roleMasterModel.IsInsert);
                    cmd.Parameters.AddWithValue("@IsUpdate", roleMasterModel.IsUpdate);
                    cmd.Parameters.AddWithValue("@IsDelete", roleMasterModel.IsDelete);
                    cmd.Parameters.AddWithValue("@MenuTypeID ", roleMasterModel.MenuTypeID);
                    cmd.Parameters.AddWithValue("@EditBy", roleMasterModel.EditBy);
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
        public DataSet SelectData()
        {
            SqlConnection con = null;
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_RoleMaster_Sel", conObj);
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