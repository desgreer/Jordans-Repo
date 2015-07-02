package com.myawesomeapp.mainapp.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.myawesomeapp.utility.ResultSetToJson;

public class BookDaoImpl implements BookDaoInterface{
	
	/*Sets up the Mysql connection and access rights*/
	public Connection init(){
		try {
			Class.forName("com.mysql.jdbc.Driver");
			System.out.println("driver found");
		} catch (ClassNotFoundException e) {
			System.out.println("driver not found " + e);
		}
		
		String url = "jdbc:mysql://127.0.0.1:3306/webappdb?user=root";
		String username = "root";
		String password = "jordan321";
		
		Connection conn = null;
		
		try {
			conn = DriverManager.getConnection(url,username,password);
			System.out.println("connected");
		}  catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return conn;
	}
	
	@Override
	public String getAllUserBooks(String uid) {
		
		Connection conn = init();
		
		try {	
			
			//get 4 random
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookName, BookImage, BookId, BookPrice, ForSale FROM books WHERE Username = "
					+ "'"+uid+"'");
						
			ResultSetToJson convertRs = new ResultSetToJson();
			
			String response = convertRs.convertResultSetBook(rs);
	
			conn.close();
			
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return "";
	}

	@Override
	public boolean changeBookSaleStatus(String bookId, String status) {
		
		Connection conn = init();
		
		try {	
			
			Statement stmt = conn.createStatement();
			stmt.executeUpdate("UPDATE books " + "SET ForSale = '"+status+"' WHERE BookId = '"+bookId+"' ");
	
			conn.close();
			
 			return true;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		
		return false;
	}

	//TODO
	public boolean changeBookOwner(String bookId, String bookStatus, String newOwner) {
		
		Connection conn = init();
		UserDaoImpl dao = new UserDaoImpl();
		
		//check new owner has enough money
		boolean adequateFunds = dao.compareUserFundsWithBookPrice(newOwner, bookId);
		
		if(adequateFunds){
						
			//change owner
			
			
			//update Funds
		}
		
		return false;
	}

	public String getAllBooksForSale(String uid) {
		
		Connection conn = init();
		
		try {	
			
			//get 4 random
			Statement stmt = conn.createStatement();
			ResultSet rs = stmt.executeQuery("SELECT BookName, BookImage, BookId, BookPrice, ForSale FROM books WHERE Username != "
					+ "'"+uid+"'");
						
			ResultSetToJson convertRs = new ResultSetToJson();
			
			String response = convertRs.convertResultSetBook(rs);
	
			conn.close();
			
 			return response;
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			System.out.println("connection failed " + e);
		}
		

		return "";
	}

}
