using AplicacionWebMVC.Datos;
using AplicacionWebMVC.Models;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class TareaController : Controller
    {
        // GET: Tarea
        TareaAdmin admin = new TareaAdmin();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListarTareas()
        {
            IEnumerable<Tarea> lista = admin.ListarTareas();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public int CrearTarea(Tarea tarea)
        {
            int nregistrosAfectados = 0;
            try
            {
                admin.Guardar(tarea);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }
        public int EditarTarea(Tarea tarea)
        {
            int nregistrosAfectados = 0;
            try
            {
                admin.Editar(tarea);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }
        public int EliminarTarea(Tarea tarea)
        {
            int nregistrosAfectados = 0;
            try
            {
                admin.Eliminar(tarea);
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;

        }
        public JsonResult BuscarPorId(int id)
        {
            IEnumerable<Tarea> lista = admin.BuscarPorID(id);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BuscarPorPrioridad(int prioridad)
        {
            IEnumerable<Tarea> lista = admin.BuscarPrioridad(prioridad);
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}