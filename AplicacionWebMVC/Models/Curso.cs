using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AplicacionWebMVC.Models
{
    public class Curso
    {
        public int IIDCURSO { get; set; }
        public string NOMBRE { get; set; }
        public string DESCRIPCION { get; set; }
        public int BHABILITADO { get; set; }
    }
}