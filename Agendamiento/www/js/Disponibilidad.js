function mostrarCitasAgendadas(id) {
  var datos = [];
 $.ajax({
    type: 'POST',
    data: {
      Idafiliado:id 
    },
    url: 'http://localhost:65149//account/GetCitasAsignadas',
    dataType: 'json',   
    success: function(response) {
      for (var i = 0; i < response.DataObject.length; i++) {
		var detalle= 'Medico: '+response.DataObject[i].Medico+', consultorio:' +response.DataObject[i].Consultorio + ' Fecha:' + response.DataObject[i].Fecha;
		datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle});
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

    url: 'http://localhost:65149//account/GetCitasDisponibles',
    dataType: 'json',    
    success: function(response) {
 
      $( "#citasAgendadas" ).empty();
      for (var i = 0; i < response.DataObject.length; i++) {
    var detalle= 'Medico: '+response.DataObject[i].Medico+', consultorio:' +response.DataObject[i].Consultorio + ' Fecha:' + response.DataObject[i].Fecha;
    datos.push({Titulo:response.DataObject[i].Especialidad,Descripcion:detalle, Agenda: response.DataObject[i].Idagenda });
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
    url: 'http://localhost:65149//account/GetCitasDisponiblesAutorizadas',
    dataType: 'json',   
    success: function(response) {
      $( "#citasAgendadas" ).empty();
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

    // alert(e.medico);
    debugger;
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
      $("#Titulo").empty();
      $("#Descripcion").empty();
      $("#Titulo").append(e.Titulo);
      $("#Descripcion").append(e.Descripcion);
      $("#IdCita").append(e.Id);
      
      var modal_=$('#myModal');
      modal_.modal('show');

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

function confirmarCita(){

   debugger;
   
    var datos = [];
    $.ajax({
    type: 'POST', 
     data: {
      Agenda:$("#IdAgenda").val(),
      IdAfiliado: $("#IdAfiliado").val()
    },  
    url: 'http://localhost:65149//account/ConfirmarCita',
    dataType: 'json',   
    success: function(response) {
      alert("exito");
    },
    error: function(msg){
      $('#boton_enviar').attr('disabled', false);
    }
   });
}


