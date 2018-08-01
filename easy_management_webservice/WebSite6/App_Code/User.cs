using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for User
/// </summary>
public class User
{

    public int userID { get; set; }
    public string userName { get; set; }
    public string pass { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string email { get; set; }
    public string tel { get; set; }
    public string img { get; set; }

    public User(int userID , string userName , string password , string firstName , string lastName , string email , string tel)
    {
        this.userID = userID;
        this.userName = userName;
        pass = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.tel = tel;
        
    }
}