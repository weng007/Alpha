using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;

namespace AlphaApi.DataAccessLayer
{
    public class BDC
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        public string InsertData(BDCModels BDC)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_BDC_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Docver", BDC.Docver);
                    cmd.Parameters.AddWithValue("@QuotationNo", BDC.QuotationNo);
                    cmd.Parameters.AddWithValue("@Price", BDC.Price);
                    cmd.Parameters.AddWithValue("@Cost", BDC.Cost);
                    cmd.Parameters.AddWithValue("@Profit", BDC.Profit);
                    cmd.Parameters.AddWithValue("@Remark", BDC.Remark);
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

        public string UpdateData(BDCModels BDC)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_BDC_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", BDC.ID);
                    cmd.Parameters.AddWithValue("@Docver", BDC.Docver);
                    cmd.Parameters.AddWithValue("@QuotationNo", BDC.QuotationNo);
                    cmd.Parameters.AddWithValue("@Price", BDC.Price);
                    cmd.Parameters.AddWithValue("@Cost", BDC.Cost);
                    cmd.Parameters.AddWithValue("@Profit", BDC.Profit);
                    cmd.Parameters.AddWithValue("@Remark", BDC.Remark);
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

        public string DeleteData(BDCModels BDC)
        {
            SqlConnection con = null;
            string result = "";
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_BDC_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", BDC.ID);
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

        public DataSet SelectDataByID(BDCModels BDC)
        {
            SqlConnection con = null;
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_BDC_Sel", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", BDC.ID); // i will pass zero to MobileID beacause its Primary .
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
        public DataSet SelectAllData()
        {
            SqlConnection con = null;
            string result = "";
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_BDC_Search", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
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