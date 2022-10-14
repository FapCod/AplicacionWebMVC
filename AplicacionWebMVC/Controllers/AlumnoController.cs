using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class AlumnoController : Controller
    {
        // GET: Alumno
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ListarALumnos()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Alumno.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDALUMNO, p.NOMBRE, p.APPATERNO,p.APMATERNO,p.TELEFONOPADRE}).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarSexo()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Sexo.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDSEXO, p.NOMBRE }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
    }
}