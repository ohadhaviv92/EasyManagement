using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _DAL
{
    public static class DAL
    {
        private static string connectionStr = ConfigurationManager.ConnectionStrings["LIVEDNS"].ConnectionString;
        private static SqlConnection con = new SqlConnection(connectionStr);
        private static SqlDataAdapter adtr = null;
        private static SqlCommand cmd = null;
        private static SqlDataReader reader = null;


        static public DataTable Login(string userName, string password)
        {
          
            try
            {
                con.Open();
                cmd = new SqlCommand($"Login", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("userName", userName));
                cmd.Parameters.Add(new SqlParameter("pass", password));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;
        }

        static public DataTable Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        { 
            try
            {
                con.Open();
                cmd = new SqlCommand($"Register", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("userName", userName));
                cmd.Parameters.Add(new SqlParameter("pass", pass));
                cmd.Parameters.Add(new SqlParameter("firstName", firstName));
                cmd.Parameters.Add(new SqlParameter("lastName", lastName));
                cmd.Parameters.Add(new SqlParameter("email", email));
                cmd.Parameters.Add(new SqlParameter("tel", tel));

                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "User");

                if (ds.Tables["User"].Rows.Count != 0)
                    return ds.Tables["User"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
            return null;
        }

        static public DataTable AddNewSite(int userID, string siteName, string siteAddress)
        {
 
            try
            {
                con.Open();
                cmd = new SqlCommand($"AddNewSite", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("@userID", userID));
                cmd.Parameters.Add(new SqlParameter("@siteName", siteName));
                cmd.Parameters.Add(new SqlParameter("siteAddress", siteAddress));
                adtr = new SqlDataAdapter(cmd);

                DataSet ds = new DataSet();
                adtr.Fill(ds, "Site");

                if (ds.Tables["Site"].Rows.Count != 0)
                    return ds.Tables["Site"];
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                    con.Close();
            }
        
            return null;

        }

    }
}
