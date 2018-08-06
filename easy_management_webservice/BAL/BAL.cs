
using _DAL;
using System;
using System.Collections.Generic;
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
            SqlDataReader results = DAL.Login(userName , password);
            User login_user = new User(
                                         int.Parse(results["userID"].ToString()),
                                         results["userName"].ToString(),
                                         results["pass"].ToString(),
                                         results["firstName"].ToString(),
                                         results["lastName"].ToString(),
                                         results["email"].ToString(),
                                         results["tel"].ToString()
                                        );
            return login_user;
        }
    }
}
