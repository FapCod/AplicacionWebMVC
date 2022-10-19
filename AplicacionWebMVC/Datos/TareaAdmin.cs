using AplicacionWebMVC.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Data.SqlTypes;

namespace AplicacionWebMVC.Datos
{
    
    public class TareaAdmin:Conexion
    {
        //funcion de listar tareas
        public IEnumerable<Tarea> ListarTareas()
        {
            Conectar();
            List<Tarea> lista = new List<Tarea>();
            try
            {
                SqlCommand cmd = new SqlCommand("sp_consultar_tareas", cnn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Tarea obj = new Tarea
                    {
                        ID = Convert.ToInt32(dr["ID"].ToString()),
                        TITULO = dr["TITULO"].ToString(),
                        NOTAS = dr["NOTAS"].ToString(),
                        ESTADO= Convert.ToInt32(dr["ESTADO"].ToString()),
                        PRIORIDAD= Convert.ToInt32(dr["PRIORIDAD"].ToString()),
                        FECHA_CREACION = Convert.ToDateTime(dr["FECHA_CREACION"].ToString()),
                        FECHA_TERMINO = Convert.ToDateTime(dr["FECHA_TERMINO"].ToString())
                    };
                    lista.Add(obj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
            return lista;
        }
        //fin de funcion de listar tareas
        //guardar
        public void Guardar(Tarea tarea)
        {
            Conectar();
            try
            {
                SqlCommand comando = new SqlCommand("sp_crear_tarea", cnn);
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@TITULO",tarea.TITULO);
                comando.Parameters.AddWithValue("@NOTAS",tarea.NOTAS);
                comando.Parameters.AddWithValue("@ESTADO",tarea.ESTADO);
                comando.Parameters.AddWithValue("@PRIORIDAD",tarea.PRIORIDAD);
                comando.Parameters.AddWithValue("@FECHA_CREACION", ((DateTime)tarea.FECHA_CREACION));
                comando.Parameters.AddWithValue("@FECHA_TERMINO", ((DateTime)tarea.FECHA_TERMINO));
                comando.ExecuteNonQuery();
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
        }
        //fin guardar
        //funcion de editar
        public void Editar(Tarea tarea) {

            Conectar();
            try
            {
                SqlCommand comando = new SqlCommand("sp_actualizar_tarea", cnn);
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@ID", tarea.ID);
                comando.Parameters.AddWithValue("@TITULO", tarea.TITULO);
                comando.Parameters.AddWithValue("@NOTAS", tarea.NOTAS);
                comando.Parameters.AddWithValue("@ESTADO", tarea.ESTADO);
                comando.Parameters.AddWithValue("@PRIORIDAD", tarea.PRIORIDAD);
                comando.Parameters.AddWithValue("@FECHA_CREACION", ((DateTime)tarea.FECHA_CREACION));
                comando.Parameters.AddWithValue("@FECHA_TERMINO", ((DateTime)tarea.FECHA_TERMINO));
                //((DateTime)tarea.FECHA_TERMINO).ToShortDateString()
                comando.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                Console.WriteLine(e.Message);
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
        }
        
        //fin de funcion editar

        //funcion eliminar tarea
        public void Eliminar(Tarea tarea){
            Conectar();
            try
            {
                SqlCommand comando = new SqlCommand("sp_eliminar_tarea", cnn);
                comando.CommandType = System.Data.CommandType.StoredProcedure;
                comando.Parameters.AddWithValue("@ID", tarea.ID);
                comando.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
        }
        //fin de funcion eliminar tarea

        //funcion de buscar por ID
        public IEnumerable<Tarea> BuscarPorID(int id)
        {
            Conectar();
            List<Tarea> lista = new List<Tarea>();
            try
            {
                SqlCommand cmd = new SqlCommand("sp_buscarID", cnn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Tarea obj = new Tarea
                    {
                        ID = Convert.ToInt32(dr["ID"].ToString()),
                        TITULO = dr["TITULO"].ToString(),
                        NOTAS = dr["NOTAS"].ToString(),
                        ESTADO = Convert.ToInt32(dr["ESTADO"].ToString()),
                        PRIORIDAD = Convert.ToInt32(dr["PRIORIDAD"].ToString()),
                        FECHA_CREACION = Convert.ToDateTime(dr["FECHA_CREACION"].ToString()),
                        FECHA_TERMINO = Convert.ToDateTime(dr["FECHA_TERMINO"].ToString())
                    };
                    lista.Add(obj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
            return lista;
        }
        //fin de funcion buscar por ID
        //funcion de buscar por prioridad
        public IEnumerable<Tarea> BuscarPrioridad(int prioridad)
        {
            Conectar();
            List<Tarea> lista = new List<Tarea>();
            try
            {
                SqlCommand cmd = new SqlCommand("sp_buscarPrioridad", cnn);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@PRIORIDAD", prioridad);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Tarea obj = new Tarea
                    {
                        ID = Convert.ToInt32(dr["ID"].ToString()),
                        TITULO = dr["TITULO"].ToString(),
                        NOTAS = dr["NOTAS"].ToString(),
                        ESTADO = Convert.ToInt32(dr["ESTADO"].ToString()),
                        PRIORIDAD = Convert.ToInt32(dr["PRIORIDAD"].ToString()),
                        FECHA_CREACION = Convert.ToDateTime(dr["FECHA_CREACION"].ToString()),
                        FECHA_TERMINO = Convert.ToDateTime(dr["FECHA_TERMINO"].ToString())
                    };
                    lista.Add(obj);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
            }
            finally
            {
                Desconectar();
            }
            return lista;
        }
        //fin de funcion buscar por prioridad
    }
}