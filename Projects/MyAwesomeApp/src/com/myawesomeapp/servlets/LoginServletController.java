package com.myawesomeapp.servlets;
 
import java.io.IOException; 
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import com.google.gson.Gson;
import com.myawesomeapp.utility.*;
 
/*
 * A java controller class that deals with ajax requests from the login page
 * */

@WebServlet(
        description = "Login Servlet", 
        urlPatterns = { "/LoginServlet" })

public class LoginServletController extends HttpServlet {

	private static final long serialVersionUID = 1L;
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	UserAccessValidator check = new UserAccessValidator(); 
    	LoginResponseBase JsonResponse;
    	
    	/*Retrieves ajax request and converts JSON to a POJO*/
    	Gson gson = new Gson();
    	JSONObject jObj = new JSONObject(request.getParameter("input")); 
		User user = gson.fromJson(jObj.toString(), User.class);
 	
    	/*Returns a boolean verifying is a user has passed secrity checks*/
        boolean isInputValid = check.validateDetails(user.getUsername(), user.getPassword());
            
        /*If sequence determines if the User details are valid a each stage. A Java object is constructed
         * with relevant values and sent back to client via ajax*/
        if(!isInputValid){   
        	
        	JsonResponse = new LoginResponseBase("User details do not meet the required standards", "false");
        	String json = gson.toJson(JsonResponse); 	
        	response.getWriter().write(json); 
        	
        } else {     
        	
        	UserDaoImpl uDao = new UserDaoImpl();
        	boolean isOnSystem = uDao.readAndCompare(user); 
        	
        	if(isOnSystem){
        		
        		//append user id for future reference
            	JsonResponse = new LoginResponseBase(user.getUsername(), "true");
            	String json = gson.toJson(JsonResponse); 	
            	response.getWriter().write(json);  
            	
        	} else {
        		
            	JsonResponse = new LoginResponseBase("User details are not on the system", "false");
            	String json = gson.toJson(JsonResponse); 	
            	response.getWriter().write(json);             	
            }
        }        
    }
 
}