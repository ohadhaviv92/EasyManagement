using BAL;
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
        private static SqlConnection con = new SqlConnection(@"Data Source=DESKTOP-I84F5L4\SQLEXPRESS;Initial Catalog=EasyManagement;Integrated Security=True");
        private static SqlDataAdapter adtr = null;
        private static SqlCommand cmd = null;
        private static SqlDataReader reader = null;


        static public SqlDataReader Login(string userName, string password)
        {
          
            try
            {
                con.Open();
                cmd = new SqlCommand($"Login", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add(new SqlParameter("userName", userName));
                cmd.Parameters.Add(new SqlParameter("pass", password));
                reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    return reader;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
            finally
            {
                if (con != null && con.State == ConnectionState.Open)
                {
                    con.Close();
                }

                if (reader != null && !reader.IsClosed)
                {
                    reader.Close();
                }

            }
            return null;

        }
    }
}
