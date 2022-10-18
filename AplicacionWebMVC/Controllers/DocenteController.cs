using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class DocenteController : Controller
    {
        // GET: Docente
        public ActionResult Index()
        {
            return View();
        }

        //listar todos los docentes
        public JsonResult ListarDocentes()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarModalidadContrato()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.ModalidadContrato.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { IID = p.IIDMODALIDADCONTRATO, p.NOMBRE }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
            
        }
        
        public JsonResult BuscarDocentePorModalidad(int modalidad)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Docente.Where(p => p.BHABILITADO.Equals(1) && p.IIDMODALIDADCONTRATO.Equals(modalidad))
                .Select(p => new { p.IIDDOCENTE, p.NOMBRE, p.APPATERNO, p.APMATERNO, p.EMAIL }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        
    }
}