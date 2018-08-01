using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
// [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService
{

    public WebService()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod]
    public string Login(string userName, string password)
    {
        User user_login = DB_Handler.Login(userName, password);
        return new JavaScriptSerializer().Serialize(user_login);
    }


    [WebMethod]
    public string Register(string userName, string pass, string firstName, string lastName, string email,  string tel)
    {
        User user_login = DB_Handler.Register(userName , pass,firstName,  lastName,  email,   tel );
        return new JavaScriptSerializer().Serialize(user_login);
    }

    [WebMethod]
    public string AddNewSite(int userID, string siteName, string siteAddress)
    {
        BuildingSite new_Site = DB_Handler.AddNewSite(userID,  siteName,  siteAddress);
        return new JavaScriptSerializer().Serialize(new_Site);
    }


}
