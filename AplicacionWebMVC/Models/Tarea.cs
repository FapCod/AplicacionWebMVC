using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AplicacionWebMVC.Models
{
    public class Tarea
    {
        public int ID { get; set; }
        public string TITULO { get; set; }
        public string NOTAS { get; set; }
        public int ESTADO { get; set; }
        public int PRIORIDAD { get; set; }
        public DateTime? FECHA_CREACION { get; set; }
        public DateTime? FECHA_TERMINO { get; set; }
    }
}