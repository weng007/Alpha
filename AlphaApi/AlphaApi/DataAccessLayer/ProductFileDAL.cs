using System;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace AlphaApi.DataAccessLayer
{
    public class ProductFileDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public string InsertData(ProductFilesModels ProductFiles)
        {
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductFile_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@RefID", ProductFiles.RefID);
                    cmd.Parameters.AddWithValue("@AttachName", ProductFiles.AttachName != null && ProductFiles.AttachName != "" ? ProductFiles.AttachName : "");
                    cmd.Parameters.AddWithValue("@AttachPath", ProductFiles.AttachPath != null && ProductFiles.AttachPath != "" ? ProductFiles.AttachPath : "");
                    cmd.Parameters.AddWithValue("@CreateBy", ProductFiles.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", ProductFiles.EditBy);
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

        public int UpdateData(ProductFilesModels ProductFiles)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductFile_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ProductFiles.ID);
                    cmd.Parameters.AddWithValue("@RefID", ProductFiles.RefID);
                    cmd.Parameters.AddWithValue("@AttachName", ProductFiles.AttachName != null && ProductFiles.AttachName != "" ? ProductFiles.AttachName : "");
                    cmd.Parameters.AddWithValue("@AttachPath", ProductFiles.AttachPath != null && ProductFiles.AttachPath != "" ? ProductFiles.AttachPath : "");
                    cmd.Parameters.AddWithValue("@EditBy", ProductFiles.EditBy);
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

        public DataSet SelectByRefID(int refID)
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductFile_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", refID);
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);

                    //string path;
                    //string ImgName;
                    //Image image;
                    //string base64String = "";
                    //ImgName = ds.Tables[0].Rows[0]["Img"].ToString();
                    //if (ImgName != "")
                    //{
                    //    //string[] str = ImgName.Split('/');
                    //    path = System.Web.HttpContext.Current.Server.MapPath(ImgName);
                    //    image = Image.FromFile(path);
                    //    using (MemoryStream ms = new MemoryStream())
                    //    {
                    //        image.Save(ms, image.RawFormat);
                    //        byte[] imageBytes = ms.ToArray();
                    //        base64String = Convert.ToBase64String(imageBytes);
                    //    }
                    //}
                    //ds.Tables[0].Columns.Add("ImgBase");
                    //ds.Tables[0].Rows[0]["ImgBase"] = base64String != "" ? base64String : "";

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

        public int DeleteData(ProductFilesModels ProductFiles)
        {
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_ProductFile_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", ProductFiles.ID);
                    cmd.Parameters.AddWithValue("@EditBy", ProductFiles.EditBy);
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