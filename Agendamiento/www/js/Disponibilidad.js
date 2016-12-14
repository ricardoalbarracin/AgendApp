
 function mostrarDisponibilidad() {
 var datos = [
      {
        Titulo:"Maria Angelica Gonzales Rojas",
        Descripcion:"Hospital XXXX consultorio XXXX 12/12/2016 13:45"
      },
      {
        Titulo:"hola2",
        Descripcion:"mundo2"
      },
      {
        Titulo:"hola3",
        Descripcion:"mundo3"
      },
      {
        Titulo:"hola4",
        Descripcion:"mundo4"
      }
      ,
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      },
      {
        Titulo:"marco",
        Descripcion:"deisy"
      }
    ];
    mostrarTabla(datos,'citasAgendadas','verDetalle');
 }

  function verDetalle(e)
  {
      //alert(e);
      console.log(e);
      alert(e.value);
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
        '<div class="row-content"><div class="action-secondary"><i class="material-icons">delete</i><div>  </div><i class="material-icons">info</i></div><h4 class="list-group-item-heading">%s</h4><p class="list-group-item-text">%s</p></div><div class="list-group-separator"></div>'
        
        codHtml= codHtml.format(item.Titulo,item.Descripcion);
        var elemento = $.parseHTML(codHtml);
    
        var groupitem = document.createElement('a');
        groupitem.setAttribute('class', 'list-group-item' );
       

        elemento.forEach(function(itemHtml){groupitem.appendChild (itemHtml);});        
        
        padreTag.appendChild(groupitem);
    }
  

  function ConfirmarCita(){
    alert("Hola leo");
  }
  function Mostrar() {
  window.location="Agenda.html";
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