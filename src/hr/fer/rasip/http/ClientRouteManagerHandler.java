package hr.fer.rasip.http;

import java.io.IOException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import gsn.http.RequestHandler;

public class ClientRouteManagerHandler implements RequestHandler {

	@Override
	public boolean isValid(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		return true;
	}

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		
		String content  = ClientRouteManagerHandler.readFile("conf/client-routes.json", Charset.forName("UTF-8"));
		
		response.setHeader("Cache-Control", "no-store");
	    response.setDateHeader("Expires", 0);
	    response.setHeader("Pragma", "no-cache");
	    response.getWriter().write(content);
   		return; 
	}
	
	
	static String readFile(String path, Charset encoding) 
			  throws IOException 
			{
			  byte[] encoded = Files.readAllBytes(Paths.get(path));
			  return new String(encoded, encoding);
			}
}
