using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ClientApp_todos : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
      Response.ContentType = "application/json";
      Response.Write( "[{ \"id\": 1, \"details\": \"surfing\", \"finishDate\": \"01012012\", \"finished\": \"1\" }]");
    }
}