using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class RoleDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public string InsertData(RoleMasterModels roleMasterModel)
        {
            string result = "";
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
                    cmd.Parameters.AddWithValue("@CreateBy", roleMasterModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", roleMasterModel.EditBy);
                    conObj.Open();
                    result = cmd.ExecuteScalar().ToString();

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
                    SqlCommand cmd = new SqlCommand("SP_Product_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", roleMasterModel.ID);
                    cmd.Parameters.AddWithValue("@RoleID", roleMasterModel.RoleID);
                    cmd.Parameters.AddWithValue("@IsView", roleMasterModel.IsView);
                    cmd.Parameters.AddWithValue("@IsInsert", roleMasterModel.IsInsert);
                    cmd.Parameters.AddWithValue("@IsUpdate", roleMasterModel.IsUpdate);
                    cmd.Parameters.AddWithValue("@IsDelete", roleMasterModel.IsDelete);
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
    }
}