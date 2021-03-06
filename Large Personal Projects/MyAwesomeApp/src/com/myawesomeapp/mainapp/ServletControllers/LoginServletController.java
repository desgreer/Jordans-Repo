package com.myawesomeapp.mainapp.ServletControllers;
 
import java.io.IOException; 
import java.util.HashMap;
import java.util.Map;

import javax.crypto.EncryptedPrivateKeyInfo;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.myawesomeapp.utility.EncryptionManager;
import com.myawesomeapp.utility.ResponseBase;
import com.myawesomeapp.utility.ActionDetailsBuilder;
import com.myawesomeapp.mainapp.dao.ActivityDaoImpl;
import com.myawesomeapp.mainapp.dao.UserDaoImpl;
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
    	
       	EncryptionManager encrypt = new EncryptionManager();
       	
    	//convert input json data to a map
		Map<String, Object> inputMap = new Gson().fromJson(request.getParameter("input"), new TypeToken<HashMap<String, Object>>() {}.getType());
			       	
		//encrypt password before comparing
		String password = inputMap.get("password").toString();
		String passwordEncrypted = encrypt.encrypt(password);
		String username = inputMap.get("username").toString();
		
		//check which operation is required
		if(inputMap.containsValue("login")){			
			performLoginProcess(username, password, response);			 
		} else {
			performRegProcess(username, password, inputMap.get("confirm").toString(),response, passwordEncrypted);			
		}
    }

	private void performRegProcess(String username,
			String password, String confirmPassword, HttpServletResponse response, String passwordEncrypted) throws IOException {
		
		ResponseBase JsonResponse;
       	Gson gson = new Gson();
    	UserAccessValidator check = new UserAccessValidator(); 
    	ActivityDaoImpl session = new ActivityDaoImpl();
    	ActionDetailsBuilder actionBuilder = new ActionDetailsBuilder();
       	StringUrlEncoder encoder = new StringUrlEncoder();
		String encodedUsername =  encoder.encode(username);
				
		boolean isInputValid = check.validateRegDetails(username, password, confirmPassword);

		if(!isInputValid){   
			session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1001", username));
			JsonResponse = new ResponseBase("User details do not meet the required standards", "false");
			String json = gson.toJson(JsonResponse); 
			
			response.getWriter().write(json); 
		} else {
			UserDaoImpl uDao = new UserDaoImpl();
    	
			boolean isReg = uDao.insertUser(username, passwordEncrypted, "", encodedUsername);           	
			
			//success!
			if(isReg){	
				session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1002", username));
				JsonResponse = new ResponseBase(encodedUsername, "true");
				String json = gson.toJson(JsonResponse); 	
				
				response.getWriter().write(json); 
			} else {
				session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1003", username));
				JsonResponse = new ResponseBase("user details already on the system", "false");
				String json = gson.toJson(JsonResponse); 	
				response.getWriter().write(json); 
			}
		}
		
	}

	private void performLoginProcess(String username, String password, HttpServletResponse response) throws IOException {
		
		ResponseBase JsonResponse;
       	Gson gson = new Gson();
    	UserAccessValidator check = new UserAccessValidator(); 
    	ActivityDaoImpl session = new ActivityDaoImpl();
    	ActionDetailsBuilder actionBuilder = new ActionDetailsBuilder();
		UserDaoImpl uDao = new UserDaoImpl();
    	String encodedUsername = uDao.getEncodedUsername(username);
		
		/*Returns a boolean verifying is a user has passed security checks*/
		boolean isInputValid = check.validateLoginDetails(username, password);
        
		/*If sequence determines if the User details are valid a each stage. A Java object is constructed
		 * with relevant values and sent back to client via ajax*/
		if(!isInputValid){   
			session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1001", username));
			JsonResponse = new ResponseBase("User details do not meet the required standards", "false");
			String json = gson.toJson(JsonResponse); 	
			
			response.getWriter().write(json);     	
		} else {       	
			boolean isOnSystem = uDao.readAndCompare(username,password); 
    	
			//success!
			if(isOnSystem){
				session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1004", username));
			    JsonResponse = new ResponseBase(encodedUsername, "true");
			    System.out.println(encodedUsername);
			    String json = gson.toJson(JsonResponse); 	
			   
			    response.getWriter().write(json); 
			} else {
				session.tryInsertActivity(actionBuilder.buildActionString("CODE: 1005", username));
				JsonResponse = new ResponseBase("User details are not on the system", "false");
				String json = gson.toJson(JsonResponse); 	
				
				response.getWriter().write(json);             	
			}
		} 		
	}
 
}