using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AplicacionWebMVC.Controllers
{
    public class CursoController : Controller
    {
        // GET: Curso
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarCursos()
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }

        public JsonResult buscarCursoPorNombre(string nombre)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.NOMBRE.Contains(nombre))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public JsonResult RecuperarDatos(int id)
        {
            PruebaDataContext bd = new PruebaDataContext();
            var lista = bd.Curso.Where(p => p.BHABILITADO.Equals(1) && p.IIDCURSO.Equals(id))
                .Select(p => new { p.IIDCURSO, p.NOMBRE, p.DESCRIPCION }).ToList();
            return Json(lista, JsonRequestBehavior.AllowGet);
        }
        public int GuardarDatos(Curso curso)
        {
            int nregistrosAfectados = 0;
            try
            {
                PruebaDataContext bd = new PruebaDataContext();
                if (curso.IIDCURSO == 0)
                {
                    bd.Curso.InsertOnSubmit(curso);
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
                else
                {
                    Curso obj = bd.Curso.Where(p => p.IIDCURSO.Equals(curso.IIDCURSO)).First();
                    obj.NOMBRE = curso.NOMBRE;
                    obj.DESCRIPCION = curso.DESCRIPCION;
                    bd.SubmitChanges();
                    nregistrosAfectados = 1;
                }
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }
        public int Eliminar(Curso curso)
        {
            int nregistrosAfectados = 0;
            try
            {
                PruebaDataContext bd = new PruebaDataContext();
                Curso obj = bd.Curso.Where(p => p.IIDCURSO.Equals(curso.IIDCURSO)).First();
                obj.BHABILITADO = 0;
                bd.SubmitChanges();
                nregistrosAfectados = 1;
            }
            catch (Exception ex)
            {
                nregistrosAfectados = 0;
                Console.WriteLine(ex.Message);
            }
            return nregistrosAfectados;
        }

    }
}