
 function mostrarDisponibilidad() {
 var datos = [
      {
        ESM:"Grupo aéreo 1",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo 2",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo 3",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo 4",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      }
      ,
      {
        ESM:"Grupo aéreo5",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo6",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo7",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        ESM:"Grupo aéreo8",
        fecha:"13/04/1993",
        medico:"Isaac Asimov",
        especialidad:"Medicina general",
        paciente:"Daniela Lopez",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      }
    ];
    mostrarTabla(datos,'citasAgendadas','verDetalle');
 }

  function verDetalle(e)
  {
     // console.log(e);
     
    // alert(e.medico);
      $("#medico").val(e.medico);
      $("#fecha").val(e.fecha);
      $("#ESM").val(e.ESM);
      $("#especialidad").val(e.especialidad);
       //$("#botondelModal").trigger("click");
         
         jQuery.noConflict(); 
         $('#myModal').modal('show');

  }

  function mostrarTabla(rows,padre,funcion) {
        padreTag = document.getElementById(padre);
        rows.forEach(function(item){crearItem(item,padreTag,funcion)});
    }
    String.prototype.format = function() {
        var newStr = this, i = 0;
        while (/%s/.test(newStr))
            newStr = newStr.replace("%s", arguments[i++])

        return newStr;
    }
    
    function crearItem(item,padreTag,funcion) {
        var codHtml=
        '<div class="row-content"><h4 class="list-group-item-heading">%s</h4><p class="list-group-item-text">%s</p></div><div class="list-group-separator"></div> '
        
        codHtml= codHtml.format(item.especialidad,item.Descripcion);
        var elemento = $.parseHTML(codHtml);
        var groupitem = document.createElement('a');
        groupitem.setAttribute('class', 'list-group-item' );
        var funcion_=funcion + '(item); ';
        
        //groupitem.setAttribute('onclick',  funcion_);
        groupitem.onclick=function(){eval(funcion_);};


        elemento.forEach(function(itemHtml){groupitem.appendChild (itemHtml);});        
        
        padreTag.appendChild(groupitem);
    }
  

  function Mostrar() {
  
    $.ajax({
    type: 'POST',
    data: {
      parametro1: $('#nombre').val(),
      parametro2: $('#email').val()
    },
    url: 'http://weblayer.us-east-1.elasticbeanstalk.com/account/UserValidate',
    dataType: 'json',   
    success: function(response) {
      alert("hola "+response.DataObject.Nombre)
      window.location="Agenda.html";

    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
}