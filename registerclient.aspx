<%  @Page Language="C#" debug="false" trace="false" %>
<%@ Import Namespace="System.Data" %>
<%@ Import Namespace="System.Data.SqlClient" %>
<%@ Import Namespace="System.Data.Odbc" %>
 
<% 
 
String currentVersion = "3.1.0";
String connectionstring = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
 
NameValueCollection coll = Request.Form;
OdbcConnection cn = new OdbcConnection(connectionstring);
OdbcCommand cmd = new OdbcCommand();
cmd.CommandType = CommandType.StoredProcedure;
cmd.CommandText = "Call sp_RegisterClient(?,?,?,?,?,?,?,?,?)";
cmd.Connection = cn;
 
// ORDER MATTERS !!
string ipaddress = Request.ServerVariables.Get("HTTP_X_REAL_IP");  // REMOTE_ADDR is now NAT'd address
string truncatedIpAddress = ipaddress.Substring(0, ipaddress.LastIndexOf(".") + 1) + "0";
 
cmd.Parameters.Add("@Remote_Addr", OdbcType.NText).Value = truncatedIpAddress;
cmd.Parameters.Add("@HTTP_Accept_Language", OdbcType.NText).Value = Request.ServerVariables.Get("HTTP_ACCEPT_LANGUAGE");
cmd.Parameters.Add("@HTTP_User_Agent", OdbcType.NText).Value = Request.ServerVariables.Get("HTTP_USER_AGENT");
 
if (coll.GetValues("FlashVersion") !=  null)
  cmd.Parameters.Add("@FlashVersion", OdbcType.NText).Value = coll.GetValues("FlashVersion")[0];
else 
  cmd.Parameters.Add("@FlashVersion", OdbcType.NText).Value = string.Empty;
 
if (coll.GetValues("TimeZoneOffset") != null)
  cmd.Parameters.Add("@TimeZoneOffset", OdbcType.Int).Value = int.Parse(coll.GetValues("TimeZoneOffset")[0]);
else
  cmd.Parameters.Add("@TimeZoneOffset", OdbcType.Int).Value = 0;
 
if (coll.GetValues("Resolution") != null)
  cmd.Parameters.Add("@Resolution", OdbcType.NText).Value = coll.GetValues("Resolution")[0];
else
  cmd.Parameters.Add("@Resolution", OdbcType.NText).Value = string.Empty;
 
if (coll.GetValues("Referrer") != null)
  cmd.Parameters.Add("@Referrer", OdbcType.NText).Value = coll.GetValues("Referrer")[0];
else
  cmd.Parameters.Add("@Referrer", OdbcType.NText).Value = string.Empty;
 
if (coll.GetValues("Version") != null)
  cmd.Parameters.Add("@Version", OdbcType.NText).Value = coll.GetValues("Version")[0];
else
  cmd.Parameters.Add("@Version", OdbcType.NText).Value = string.Empty;
 
cmd.Parameters.Add("@ALL_RAW", OdbcType.NText).Value = Request.ServerVariables.Get("ALL_RAW");
 
try {
      cn.Open();
      Int32 rowsAffected = cmd.ExecuteNonQuery();
      cn.Close();
      Response.Write("Version=" + currentVersion);
}
catch (Exception e) {
      if (! (cn == null)) { cn.Close(); }
}
 
%>
