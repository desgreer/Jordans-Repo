/**
 * Client side logic 
 */

$(document).ready(function(){

	var origUsers = [];
    var params = getParams();
    var uid = params["id"][0]
    
    fetchBooksSell();
    fetchBooksBuy();
     
     function fetchBooksSell(){
    	 
      	var obj = new Object();
    	obj.id = uid
     	obj.action = "sell";
     	
     	$.ajax({
     	       type : 'get',
     	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
     	       dataType: 'JSON',
     	       data : {input : JSON.stringify(obj)} ,
     	            success : function(response) {
     	            	
     	            //parse json feedback
     	            if(response != "[]"){
     	            	response = JSON.parse(response);
     	            	
     	            	$('#booksBoxSell').empty();
     	            	
     	            	for(i = 0; i < response.length; i++){
     	            		
 	            			//remove name spaces, append as id. add info to box
 	            			str = response[i]["bookName"];
 	            			var book = $('<option id='+response[i]["bookId"]+'>'+str+'</option>'); 
 	            			
 	            			//divide into boxes based on status
     	            		if(response[i]["forSale"] == false){
     	            			$('#booksBoxSell').append(book);
     	            		}   	            		
     	            	}
     	            }
     	                           
     	            },
     	            error: function() {
     	                $('#ajaxGetUserServletResponse').text('An error occurred');
     	             }
     	      });   
     }
     
     function fetchBooksBuy(){
    	 
      	var obj = new Object();
     	obj.action = "buy";
    	obj.id = uid;
     	
      	$.ajax({
  	       type : 'get',
  	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
  	       dataType: 'JSON',
  	       data : {input : JSON.stringify(obj)} ,
  	            success : function(response) {
     	            //parse json feedback
     	            if(response != "[]"){
     	            	response = JSON.parse(response);
     	            	
     	            	$('#booksBoxBuy').empty();
     	            	
     	            	for(i = 0; i < response.length; i++){
     	            		
 	            			//remove name spaces, append as id. add info to box
 	            			str = response[i]["bookName"];
 	            			var book = $('<option id='+response[i]["bookId"]+'>'+str+'</option>'); 
 	            			
 	            			//divide into boxes based on status
     	            		if(response[i]["forSale"] == true){
     	            			$('#booksBoxBuy').append(book);
     	            		}   
     	            		
     	            		origUsers[i] = response[i]["username"]
     	            	}
     	            } 	                           
  	            },
  	            error: function() {
  	                $('#ajaxGetUserServletResponse').text('An error occurred');
  	             }
  	      });   
      }
     
     $(document.body).on('click', '#sellButton' ,function(){
    	 
     	var obj = new Object();
    	obj.id = $( "#booksBoxSell option:selected" ).attr('id')
    	obj.status = "true";
     	obj.action = "sell";
    	
    	 $.ajax({
   	       type : 'post',
   	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
   	       dataType: 'JSON',
   	       data : {input : JSON.stringify(obj)} ,
   	            success : function(response) {
                 	$('#ajaxGetUserServletResponse').text(response["feedback"]);
   	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
   	          	    
   	          	    fetchBooksSell();
   	            },
   	            error: function() {
                 	$('#ajaxGetUserServletResponse').text("an error occured");
   	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
   	             }
   	      });   
     });
     
     $(document.body).on('click', '#buyButton' ,function(){
    	 
      	var obj = new Object();
     	obj.id = $( "#booksBoxBuy option:selected" ).attr('id')
     	obj.status = "false";
     	obj.action = "buy";
     	obj.newOwner = uid;
     	obj.oldOwner = origUsers[$("#booksBoxBuy")[0].selectedIndex];
     	     	
     	 $.ajax({
    	       type : 'post',
    	       url : 'http://localhost:8080/MyAwesomeApp/MarketplaceServlet',
    	       dataType: 'JSON',
    	       data : {input : JSON.stringify(obj)} ,
    	            success : function(response) {
    	            	$('#ajaxGetUserServletResponse').text(response["feedback"]);
    	          	    $("#ajaxGetUserServletResponse").css({"opacity":"1"});
    	          	    
       	          	    fetchBooksSell();
       	          	    fetchBooksBuy();

    	            },
    	            error: function() {
    	            	$('#ajaxGetUserServletResponse').text("an error occured");
    	          		$("#ajaxGetUserServletResponse").css({"opacity":"1"});
    	             }
    	      });   
      });
     
     $(document.body).on('click', '#infoButton' ,function(){    	     	 
    	 
    	if($( "#booksBoxBuy option:selected" ).attr('id') != undefined || $( "#booksBoxSell option:selected" ).attr('id') != undefined){
    		if($( "#booksBoxBuy option:selected" ).attr('id') != undefined){
    			window.location = "http://localhost:8080/MyAwesomeApp/jsp/BookInformation.jsp" + '?bookid=' + $( "#booksBoxBuy option:selected" ).attr('id') + '&id=' +uid;
    		} else {
    			window.location = "http://localhost:8080/MyAwesomeApp/jsp/BookInformation.jsp" + '?bookid=' + $( "#booksBoxSell option:selected" ).attr('id') + '&id='  +uid;    		
    		}
    	} else {
           	$('#ajaxGetUserServletResponse').text("Please Pick a book :)");
      		$("#ajaxGetUserServletResponse").css({"opacity":"1"});
    	}
    	
     });
}); 