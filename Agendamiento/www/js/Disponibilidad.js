function mostrarCitasAgendadas(id) {
  var datos = [];
 $.ajax({
    type: 'POST',
    data: {
      Idafiliado:id 
    },
    url: 'http://localhost:62684//Account/GetCitasAsignadas',
    dataType: 'json',   
    success: function(response) {
      for (var i = 0; i < response.DataObject.length; i++) {
		var detalle= 'Medico: '+response.DataObject[i].Medico + ' Fecha:' + response.DataObject[i].Fecha;
		datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle,Id:response.DataObject[i].Id});
	    }
		mostrarTabla(datos,'citasAgendadas','verDetalleCita');
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
    
 }

 function mostrarHistoicoAgendas(id) {
  var datos = [];
 $.ajax({
    type: 'POST',
    data: {
      Idafiliado:id 
    },
    url: 'http://localhost:62684//Account/GetHistoricoAgendas',
    dataType: 'json',   
    success: function(response) {
      for (var i = 0; i < response.DataObject.length; i++) {
    var detalle= 'Medico: '+response.DataObject[i].Medico + ' Fecha:' + response.DataObject[i].Fecha+ ' Estado:' + response.DataObject[i].Estado;
    datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle,Id:response.DataObject[i].Id});
      }
    mostrarTabla(datos,'citasAgendadas','verDetalleCita');
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
    
 }

 function mostrarDisponibilidadAgenda() {
  var datos = []; 
 $.ajax({
    type: 'POST',   
    data: {
      Esm: $("#regional").val(),
      Profesional: $("#profesional").val(),
      Especialidad: $("#especialidad").val()     
    }, 

    url: 'http://localhost:62684//Account/GetCitasDisponibles',
    dataType: 'json',    
    success: function(response) {
      $( "#citasDisponibles" ).empty();

      if(response.DataObject== null){
        alert("No hay agenda disponible");
      }else{
        for (var i = 0; i < response.DataObject.length; i++) {
          var detalle= 'Medico: '+response.DataObject[i].Medico+', consultorio:' +response.DataObject[i].Consultorio + ' Fecha:' + response.DataObject[i].Fecha;
          datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle, Agenda: response.DataObject[i].Idagenda });
        }     
      }
    mostrarTabla(datos,'citasDisponibles','verDetalle');
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
    
 }

 function mostrarDisponibilidadAgendaAutorizada() {

  var datos = [];
 $.ajax({
    type: 'POST', 
     data: {
      Autorizacion:$("#autorizacion").val()
    },  
    url: 'http://localhost:62684//Account/GetCitasDisponiblesAutorizadas',
    dataType: 'json',   
    success: function(response) {
      $( "#citasAutorizadasDisponibles" ).empty();
      for (var i = 0; i < response.DataObject.length; i++) {
    var detalle= 'Medico: '+response.DataObject[i].Medico+', consultorio:' +response.DataObject[i].Consultorio + ' Fecha:' + response.DataObject[i].Fecha;
    datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle, Agenda: response.DataObject[i].Idagenda});
      }
    mostrarTabla(datos,'citasAutorizadasDisponibles','verDetalle');
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
    
 }

  function verDetalle(e)
  {

      $("#Titulo").empty();
      $("#Descripcion").empty();
      $("#Titulo").append(e.Titulo);
      $("#Descripcion").append(e.Descripcion);

      $("#IdAgenda").val(e.Agenda);
       //$("#botondelModal").trigger("click");
         
         //jQuery.noConflict(); 
         var modal_=$('#myModal');
         modal_.modal('show');

  }

  function verDetalleCita(e)
  {
      var IdAfiliado =  $("#IdAfiliado").val();
      $("#Titulo").empty();
      $("#Descripcion").empty();
      $("#Titulo").append(e.Titulo);
      $("#Descripcion").append(e.Descripcion);
      var idCita=$("#IdCita");
      idCita.value=e.Id;
      
      var modal_=$('#myModal');
      //modal_.modal('show');
      window.location="DetalleCita.html?id="+ e.Id+"&IdAfiliado="+IdAfiliado;

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
    url: 'http://lowcost-env.jketzinq7a.us-east-1.elasticbeanstalk.com/account/UserValidate',
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

function confirmarCita(){

    var IdAfiliado =  $("#IdAfiliado").val();
    var datos = [];
    $.ajax({
    type: 'POST', 
     data: {
      Agenda:$("#IdAgenda").val(),
      IdAfiliado: $("#IdAfiliado").val()
    },  
    url: 'http://localhost:62684//Account/ConfirmarCita',
    dataType: 'json',   
    success: function(response) {
       alert("Cita creada exitosamente!");
       window.location="Agenda.html?IdAfiliado="+IdAfiliado;
    },
    error: function(msg){
      alert("Ocurrió un error al agendar la cita");
      $('#boton_enviar').attr('disabled', false);
    }
   });
}

function cancelarCita(){
   debugger;   
   var cita= $("#motivoCancela").val();
    var IdAfiliado =  $("#IdAfiliado").val();

    var datos = [];
    $.ajax({
    type: 'POST', 
     data: {
      idCita:$("#IdCita").val(),
      motivo: $("#motivoCancela").val(),
      justificacion: $("#justificacion").val()
    },  
    url: 'http://localhost:62684//Account/CancelarCita',
    dataType: 'json',   
    success: function(response) {
      alert("Cita cancelada exitosamente!");
       window.location="Agenda.html?IdAfiliado="+IdAfiliado;
    },
    error: function(msg){
      alert("Ocurrió un error al cancelar la cita");
      $('#boton_enviar').attr('disabled', false);
    }
   });
}


