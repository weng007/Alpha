﻿using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;

namespace AlphaApi.DataAccessLayer
{
    public class SecurityProfileDetailDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(SecurityProfileDetailModels securityProfileDetailModel)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SecurityID", securityProfileDetailModel.SecurityID);
                    cmd.Parameters.AddWithValue("@IsView", securityProfileDetailModel.IsView);
                    cmd.Parameters.AddWithValue("@IsInsert", securityProfileDetailModel.IsInsert);
                    cmd.Parameters.AddWithValue("@IsUpdate", securityProfileDetailModel.IsUpdate);
                    cmd.Parameters.AddWithValue("@IsDelete", securityProfileDetailModel.IsDelete);
                    cmd.Parameters.AddWithValue("@MenuTypeID ", securityProfileDetailModel.MenuTypeID);
                    cmd.Parameters.AddWithValue("@CreateBy", securityProfileDetailModel.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", securityProfileDetailModel.EditBy);
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
        public int UpdateData(SecurityProfileDetailModels securityProfileDetailModel)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", securityProfileDetailModel.ID);
                    cmd.Parameters.AddWithValue("@SecurityID", securityProfileDetailModel.SecurityID);
                    cmd.Parameters.AddWithValue("@IsView", securityProfileDetailModel.IsView);
                    cmd.Parameters.AddWithValue("@IsInsert", securityProfileDetailModel.IsInsert);
                    cmd.Parameters.AddWithValue("@IsUpdate", securityProfileDetailModel.IsUpdate);
                    cmd.Parameters.AddWithValue("@IsDelete", securityProfileDetailModel.IsDelete);
                    cmd.Parameters.AddWithValue("@MenuTypeID ", securityProfileDetailModel.MenuTypeID);
                    cmd.Parameters.AddWithValue("@EditBy", securityProfileDetailModel.EditBy);
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

                    SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_Sel", conObj);
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

        public DataSet SelectBySecurityID(int SecurityID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_SelBySecurityID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@SecurityID", SecurityID);
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

        public string DeleteDetail(SecurityProfileDetailModels securityProfileDetailModel)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_SecurityProfileDetail_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", securityProfileDetailModel.ID);
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