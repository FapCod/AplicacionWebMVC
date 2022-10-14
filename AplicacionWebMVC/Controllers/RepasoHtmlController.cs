using AplicacionWebMVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class RepasoHtmlController : Controller
    {
        // GET: RepasoHtml
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ComboBoxJS()
        {
            return View();
        }

        public JsonResult LlenarCombo()
        {
            List<Tarea> listaTareas = new List<Tarea> {
                new Tarea{Id=1,Titulo="Exponer",Estado=1,Fechacreacion=DateTime.Parse("28/12/2019"),Fechatermino=DateTime.Parse("28/12/2019")},
                new Tarea{Id=2,Titulo="Exponer2",Estado=2,Fechacreacion=DateTime.Parse("28/12/2019"),Fechatermino=DateTime.Parse("28/12/2019") },
                new Tarea{Id=3,Titulo="Exponer3",Estado=2,Fechacreacion=DateTime.Parse("28/12/2019"),Fechatermino=DateTime.Parse("28/12/2019") }
            };
            return Json(listaTareas, JsonRequestBehavior.AllowGet);
        }


    }
}