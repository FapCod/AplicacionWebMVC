using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AplicacionWebMVC.Models
{
    public class Tarea
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public int Estado { get; set; }
        public DateTime Fechacreacion { get; set; }
        public DateTime Fechatermino { get; set; }
    }
}