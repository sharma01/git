$('#user-info-modal').modal('show')

function getprinter(printer) {
        
        var val= document.getElementById(printer).getAttribute("value");
             
        var url = "index.html?name=" + val;
          window.location.href = url;
}





//read data from URL
function getUrlParam(param)
{
  param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
  var regex = new RegExp("[?&]" + param + "=([^&#]*)");
  var url   = decodeURIComponent(window.location.href);
  var match = regex.exec(url);
  return match ? match[1] : "";
}


function printData(){
	
var param = getUrlParam("name");

		
if (param=="elephant")
	
	{ $.getJSON( "http://localhost:8081/instrument/1/get", function (data) { 
		
		document.getElementById("info").innerHTML="Elephant"  ;	
		document.getElementById("p1").innerHTML="G-Code"  ;
		   document.getElementById("p2").innerHTML="Pink"  ;
		   document.getElementById("p3").innerHTML="100cm"  ;    
			document.getElementById("temp1").innerHTML= data.contextElement.attributes[0].value+"°C		 /"+data.contextElement.attributes[1].value +"°C";
			 document.getElementById("temp2").innerHTML= data.contextElement.attributes[2].value +"°C /"+data.contextElement.attributes[3].value +"°C";
				document.getElementById("temp3").innerHTML= data.contextElement.attributes[4].value+"°C /"+data.contextElement.attributes[5].value +"°C";
					return true;});
			}
	
	if (param=="sparrow")
	{   $.getJSON( "http://localhost:8081/instrument/2/get", function (data){
		
		document.getElementById("info").innerHTML="Sparrow"  ;			
		document.getElementById("p1").innerHTML="G-Code"  ;
				document.getElementById("p2").innerHTML="Black"  ;
				document.getElementById("p3").innerHTML="200cm"  ;
			 	document.getElementById("temp1").innerHTML= data.contextElement.attributes[0].value+"°C /"+data.contextElement.attributes[1].value +"°C";
         document.getElementById("temp2").innerHTML= data.contextElement.attributes[2].value +"°C /"+data.contextElement.attributes[3].value +"°C";
            document.getElementById("temp3").innerHTML= data.contextElement.attributes[4].value+"°C /"+data.contextElement.attributes[5].value +"°C";
		return true;});
	}
	
	
	if (param=="horse")
	{	
		$.getJSON( "http://localhost:8081/instrument/3/get", function (data){
			document.getElementById("info").innerHTML="Horse"  ;	
			document.getElementById("p1").innerHTML="G-Code"  ;
			document.getElementById("p2").innerHTML="White"  ;
			document.getElementById("p3").innerHTML="250cm"  ;
         	document.getElementById("temp1").innerHTML= data.contextElement.attributes[0].value+"°C /"+data.contextElement.attributes[1].value +"°C";
         document.getElementById("temp2").innerHTML= data.contextElement.attributes[2].value +"°C /"+data.contextElement.attributes[3].value +"°C";
            document.getElementById("temp3").innerHTML= data.contextElement.attributes[4].value+"°C /"+data.contextElement.attributes[5].value +"°C";
			return true;});
	}
	
	
	if (param=="pegasus")
	{	
		$.getJSON( "http://localhost:8081/instrument/3/get", function (data){
			document.getElementById("info").innerHTML="Pegasus"  ;	
			document.getElementById("p1").innerHTML="G-Code"  ;
			document.getElementById("p2").innerHTML="White"  ;
			document.getElementById("p3").innerHTML="250cm"  ;
         	document.getElementById("temp1").innerHTML= data.contextElement.attributes[0].value+"°C /"+data.contextElement.attributes[1].value +"°C";
         document.getElementById("temp2").innerHTML= data.contextElement.attributes[2].value +"°C /"+data.contextElement.attributes[3].value +"°C";
            document.getElementById("temp3").innerHTML= data.contextElement.attributes[4].value+"°C /"+data.contextElement.attributes[5].value +"°C";
			return true;});
	}

}
    

