using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class PeriodoController : Controller
    {
        // GET: Periodo
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult listarPeriodos()
        {
            String[] formats = { "dd MMM yyyy hh:mm tt PST",
                           "dd MMM yyyy hh:mm tt PDT" };
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Periodo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p=>new { p.IIDPERIODO,p.NOMBRE,FECHAINICIO=((DateTime)p.FECHAINICIO).ToShortDateString() ,FECHAFIN=((DateTime)p.FECHAFIN).ToShortDateString() }).ToList();
            return Json(lista,JsonRequestBehavior.AllowGet);
        }
        public JsonResult buscarPeridoPorNombre(string nombre)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Periodo.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombre))
                .Select(p => new { p.IIDPERIODO, p.NOMBRE, FECHAINICIO = ((DateTime)p.FECHAINICIO).ToShortDateString(), FECHAFIN = ((DateTime)p.FECHAFIN).ToShortDateString() }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}