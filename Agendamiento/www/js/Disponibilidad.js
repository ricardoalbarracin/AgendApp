
 function mostrarDisponibilidad(id) {
  var datos = [];
 $.ajax({
    type: 'POST',
    data: {
      Idafiliado:id 
    },
    url: 'http://localhost:65149/account/GetCitasAsignadas',
    dataType: 'json',   
    success: function(response) {
      for (var i = 0; i < response.DataObject.length; i++) {
		var detalle= 'Medico: '+response.DataObject[i].Medico+', consultorio:' +response.DataObject[i].Consultorio + ' Fecha:' + response.DataObject[i].Fecha;
		datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle});
	    }
		mostrarTabla(datos,'citasAgendadas','verDetalle');
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
    
 }

  function verDetalle(e)
  {
     // console.log(e);
     
     alert(e.Titulo);
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