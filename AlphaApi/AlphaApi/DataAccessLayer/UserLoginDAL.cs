using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using AlphaApi.Models;
using System;
using System.DirectoryServices;
using AlphaApi.Dataset;

namespace AlphaApi.DataAccessLayer
{
    public class UserLoginDAL
    {
        string conStr = ConfigurationManager.ConnectionStrings["mycon"].ConnectionString;
        int result = 0;
        public int InsertData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Ins", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@UserName", userLoginModels.UserName);
                    cmd.Parameters.AddWithValue("@FirstName", userLoginModels.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", userLoginModels.LastName);
                    cmd.Parameters.AddWithValue("@Email", userLoginModels.Email);
                    cmd.Parameters.AddWithValue("@SecurityID", userLoginModels.SecurityID);
                    cmd.Parameters.AddWithValue("@CreateBy", userLoginModels.CreateBy);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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
        public dsUser SelectADByUserName(string userName, string LoginUser, string LoginPassword)
        {
            //ทำตอนกดปุ่ม CheckUser (หน้า Create)
            //ดึงข้อมูลจาก AD เพื่อ Bind ค่าใน Control
            dsUser userDS = new dsUser();
            string domainName = string.Empty;
            string ADPath = string.Empty;
            //string ADuserName;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";
            //string LdapPath;
            string FirstName;
            string LastName;
            string Email;
            string Department;
            string Company;
            try
            {
                ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                if (!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(ADPath))
                {
                    domainAndUser = domainName + @"\" + LoginUser;
                    DirectoryEntry entry = new DirectoryEntry(ADPath, LoginUser, LoginPassword);
                    try
                    {
                        DirectorySearcher search = new DirectorySearcher(entry);
                        search.Filter = "(SAMAccountName=" + userName + ")";
                        search.PropertiesToLoad.Add("givenname");
                        search.PropertiesToLoad.Add("sn");
                        search.PropertiesToLoad.Add("mail");
                        search.PropertiesToLoad.Add("department");
                        search.PropertiesToLoad.Add("company");
                        SearchResult result = search.FindOne();
                        if (result != null)
                        {
                            FirstName = (String)result.Properties["givenname"][0];
                            LastName = (String)result.Properties["sn"][0];
                            Email = (String)result.Properties["mail"][0];
                            Department = (String)result.Properties["department"][0];
                            Company = (String)result.Properties["company"][0];

                            dsUser.ADUserRow dr = userDS.ADUser.NewADUserRow();
                            dr["FirstName"] = FirstName;
                            dr["LastName"] = LastName;
                            dr["Email"] = Email;
                            dr["Department"] = Department;
                            dr["Company"] = Company;

                            userDS.ADUser.AddADUserRow(dr);
                        }
                        //LdapPath = result.Path;
                    }
                    catch (Exception ex)
                    {
                        Errmsg = ex.Message;
                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //conObj.Close();
            }
            return userDS;
        }
        public DataSet SelectByID(int id, string LoginUser, string LoginPassword)
        {
            //ดึงข้อมูลจาก AD เพื่อ Bind ค่าใน Control (page_load หน้า Update)
            DataSet ds = null;
            DataSet dsAD = new DataSet("dsUser");
            string domainName = string.Empty;
            string ADPath = string.Empty;
            //string ADuserName;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";
            //string LdapPath;
            string FirstName;
            string LastName;
            string Email;
            string Department;
            string Company;
            string userName;
            int seurityID;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    //ดึงข้อมูล userName, seurityID จาก TB User
                    SqlCommand cmd = new SqlCommand("SP_User_SelByID", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", id); // i will pass zero to MobileID beacause its Primary .
                    conObj.Open();
                    SqlDataAdapter da = new SqlDataAdapter();
                    da.SelectCommand = cmd;
                    ds = new DataSet();
                    da.Fill(ds);
                    userName = ds.Tables[0].Rows[0]["UserName"].ToString(); 
                    seurityID = Convert.ToInt32(ds.Tables[0].Rows[0]["SecurityID"]);

                    //ดึงข้อมูลจาก AD 
                    ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                    domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                    if (!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(ADPath))
                    {
                        domainAndUser = domainName + @"\" + LoginUser;
                        DirectoryEntry entry = new DirectoryEntry(ADPath, LoginUser, LoginPassword);
                        try
                        {
                            DirectorySearcher search = new DirectorySearcher(entry);
                            search.Filter = "(SAMAccountName=" + userName + ")";
                            search.PropertiesToLoad.Add("givenname");
                            search.PropertiesToLoad.Add("sn");
                            search.PropertiesToLoad.Add("mail");
                            search.PropertiesToLoad.Add("department");
                            search.PropertiesToLoad.Add("company");
                            SearchResult result = search.FindOne();
                            if (result != null)
                            {
                                FirstName = (String)result.Properties["givenname"][0];
                                LastName = (String)result.Properties["sn"][0];
                                Email = (String)result.Properties["mail"][0];
                                Department = (String)result.Properties["department"][0];
                                Company = (String)result.Properties["company"][0];
                                
                            }
                            //LdapPath = result.Path;
                        }
                        catch (Exception ex)
                        {
                            Errmsg = ex.Message;
                        }

                    }

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
        public DataSet SelectData()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {

                    SqlCommand cmd = new SqlCommand("SP_User_Sel", conObj);
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
        public DataSet SelectByCondition()
        {
            DataSet ds = null;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_SelByCondition", conObj);
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
        public DataSet Authenticate(string userName, string password)
        {
            DataSet ds = null;
            string domainName = string.Empty;
            string ADPath = string.Empty;
            string strError = string.Empty;
            string domainAndUser;
            string Errmsg = "";
            string LdapPath;
            bool isAuthen;
            try
            {
                ADPath = ConfigurationManager.AppSettings["DirectoryPath"];
                domainName = ConfigurationManager.AppSettings["DirectoryDomain"];
                if(!String.IsNullOrEmpty(ADPath) && !String.IsNullOrEmpty(ADPath))
                {
                    domainAndUser = domainName + @"\" + userName;
                    DirectoryEntry entry = new DirectoryEntry(ADPath, userName, password);
                    try
                    {
                        //Check ว่า User ที่จะ login เข้ามามีอยู่ใน AD หรือไม่ 
                        DirectorySearcher search = new DirectorySearcher(entry);
                        search.Filter = "(SAMAccountName=" + userName + ")";
                        SearchResult result = search.FindOne();
                        if (result != null)
                        {
                            isAuthen = true;
                        }
                        else
                        {
                            //ถ้าไม่มี
                            isAuthen = false;
                        }
                        LdapPath = result.Path;
                    }
                    catch(Exception ex)
                    {
                        Errmsg = ex.Message;
                        isAuthen = false;
                    }
                    //ถ้า มี User ใน AD ให้ Check ต่อว่ามี User ใน Table User หรือไม่ (ถ้ามีก็จะ login ผ่าน และเก็บ UserID, UserName ไว้ใน Session)
                    if(isAuthen)
                    {
                        using (SqlConnection conObj = new SqlConnection(conStr))
                        {
                            try
                            {
                                SqlCommand cmd = new SqlCommand("SP_UserLogin", conObj);
                                cmd.CommandType = CommandType.StoredProcedure;
                                cmd.Parameters.AddWithValue("@UserName", userName);
                                conObj.Open();
                                SqlDataAdapter da = new SqlDataAdapter();
                                da.SelectCommand = cmd;
                                ds = new DataSet();
                                da.Fill(ds);
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

                return ds;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                //conObj.Close();
            }

        }
        public int UpdateData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Upd", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", userLoginModels.ID);
                    cmd.Parameters.AddWithValue("@UserName", userLoginModels.UserName);
                    cmd.Parameters.AddWithValue("@FirstName", userLoginModels.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", userLoginModels.LastName);
                    cmd.Parameters.AddWithValue("@Email", userLoginModels.Email);
                    cmd.Parameters.AddWithValue("@SecurityID", userLoginModels.SecurityID);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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
        public int DeleteData(UserLoginModels userLoginModels)
        {
            int result = 0;
            using (SqlConnection conObj = new SqlConnection(conStr))
            {
                try
                {
                    SqlCommand cmd = new SqlCommand("SP_User_Del", conObj);
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@ID", userLoginModels.ID);
                    cmd.Parameters.AddWithValue("@EditBy", userLoginModels.EditBy);
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