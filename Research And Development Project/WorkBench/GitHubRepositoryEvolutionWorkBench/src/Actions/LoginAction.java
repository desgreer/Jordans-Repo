package Actions;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Daos.UserDao;
import Models.User;

public class LoginAction implements Action {

	@Override
	public String execute(HttpServletRequest request, HttpServletResponse response) {
		
		String[] loginDetails = request.getParameterValues("input[]");	
		User user = new User(loginDetails[0], loginDetails[1], "standard");
		
		boolean isValidated = validateLoginDetails(user);
		UserDao dao = new UserDao();
		
		if(!isValidated){
			return "false";
		}

		return dao.findUser(user);
	}
		
	public boolean validateLoginDetails(User user){
		
        String patternString = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{6,}$";
        boolean matches = user.password.matches(patternString);
		
		if(user.password.length() < 6 || user.username.length() < 6 || !matches){
			return false;
		}
				
		return true;
	}

}
