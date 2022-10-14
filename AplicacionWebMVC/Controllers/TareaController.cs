using AplicacionWebMVC.Models;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class TareaController : Controller
    {
        // GET: Tarea
        List<Tarea> listaTareas = new List<Tarea>();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult ListarTareas()
        {
            Tarea tarea =new Tarea { 
                Id = 1, 
                Titulo = "Exponer", 
                Estado = 1, 
                Fechacreacion = DateTime.Parse("28/12/2019"), 
                Fechatermino = DateTime.Parse("28/12/2019") 
            };
            listaTareas.Add(tarea);
            return Json(listaTareas, JsonRequestBehavior.AllowGet);
        }

        public int CrearTarea(Tarea tarea)
        {
            Tarea t= new Tarea
            {
                Id = tarea.Id,
                Titulo = tarea.Titulo,
                Estado = tarea.Estado,
                Fechacreacion =tarea.Fechacreacion,
                Fechatermino = tarea.Fechatermino
            };
            listaTareas.Add(t);
            Console.WriteLine(tarea);
            return 1;
        }
        public JsonResult BuscarTarea(int id)
        {
            for (int i = 0; i < listaTareas.Count; i++)
            {
                if(listaTareas[i].Id == id)
                {
                    Console.WriteLine("Te encontre");
                    return Json(listaTareas[i], JsonRequestBehavior.AllowGet);
                }
                else
                {
                    Console.WriteLine("NO esta");
                }
            }
            return Json(1, JsonRequestBehavior.AllowGet); 
               
        }
        public int EliminarTarea(int id)
        {
            for (int i = 0; i < listaTareas.Count; i++)
            {
                if (listaTareas[i].Id == id)
                {
                    Console.WriteLine("Te encontre");
                    listaTareas.RemoveAt(i);
                    return 1;
                }
                else
                {
                    Console.WriteLine("NO esta");
                }
            }
            return 2 ;

        }
        
        public int EditarTarea(int id,Tarea tarea)
        {
            for (int i = 0; i < listaTareas.Count; i++)
            {
                if (listaTareas[i].Id == id)
                {
                    listaTareas[i].Id = tarea.Id;
                    listaTareas[i].Titulo = tarea.Titulo;
                    listaTareas[i].Estado = tarea.Estado;
                    listaTareas[i].Fechacreacion = tarea.Fechacreacion;
                    listaTareas[i].Fechatermino = tarea.Fechatermino;
                    return 1;
                }
                else
                {
                    Console.WriteLine("NO esta");
                }
            }
            return 2;
        }

    }
}