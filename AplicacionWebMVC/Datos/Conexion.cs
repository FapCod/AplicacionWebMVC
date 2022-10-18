using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AplicacionWebMVC.Datos
{
    public class Conexion
    {
        protected SqlConnection cnn;
        protected void Conectar()
        {
            try
            {
                cnn = new SqlConnection("Data Source=FAPCODPC;Initial Catalog=BDTODO;Integrated Security=True");
                cnn.Open();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }
        protected void Desconectar()
        {
            try
            {
                cnn.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
        }
    }
}