$('#user-info-modal').modal('show')

function getprinter(printer) {
        
        var val= document.getElementById(printer).getAttribute("value");
             
        var url = "index.html?name=" + val;
          window.location.href = url;
}