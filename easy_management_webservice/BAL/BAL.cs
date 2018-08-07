
using _DAL;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _BAL
{
    public static class BAL
    {
        static public User Login(string userName, string password)
        {
            DataTable results = DAL.Login(userName , password);
            User user = new User(
                                         int.Parse(results.Rows[0]["userID"].ToString()),
                                         results.Rows[0]["userName"].ToString(),
                                         results.Rows[0]["pass"].ToString(),
                                         results.Rows[0]["firstName"].ToString(),
                                         results.Rows[0]["lastName"].ToString(),
                                         results.Rows[0]["email"].ToString(),
                                         results.Rows[0]["tel"].ToString()
                                        );
            return user;
        }

        static public User Register(string userName, string pass, string firstName, string lastName, string email, string tel)
        {
            DataTable results = DAL.Register(userName, pass, firstName, lastName, email, tel);
            User user = new User(
                                         int.Parse(results.Rows[0]["userID"].ToString()),
                                         results.Rows[0]["userName"].ToString(),
                                         results.Rows[0]["pass"].ToString(),
                                         results.Rows[0]["firstName"].ToString(),
                                         results.Rows[0]["lastName"].ToString(),
                                         results.Rows[0]["email"].ToString(),
                                         results.Rows[0]["tel"].ToString()
                                        );
            return user;
        }

        static public BuildingSite AddNewSite(int userID, string siteName, string siteAddress)
        {

            DataTable results = DAL.AddNewSite(userID, siteName, siteAddress);
            BuildingSite site = new BuildingSite(
                                     int.Parse(results.Rows[0]["siteID"].ToString()),
                                     results.Rows[0]["siteName"].ToString(),
                                     results.Rows[0]["siteAddress"].ToString(),
                                     true
                                    );
            return site;

        }
    }
}
