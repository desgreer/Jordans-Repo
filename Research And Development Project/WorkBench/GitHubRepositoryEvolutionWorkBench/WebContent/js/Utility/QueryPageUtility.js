var darwin = darwin || {};

$(document).ready(function(e) {
	
	$('#navbar').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/NavBar.html?2');
	
	darwin.projectManagerModule.disableTabs();
	
	//load google graph library
	darwin.Facade.loadGraphLibrary();
	
	$("#submitButtonQuery").on("click.darwin", function(e){
		e.preventDefault();
		
		//parse the url
		parsedUrl = darwin.Facade.parseInputUrl($("#urlField").val());
				
		darwin.projectManagerModule.setProjectId(parsedUrl);	
	    darwin.projectManagerModule.resetVariables();
	    darwin.projectManagerModule.resetComponents();
	    
	    //contributions - STAGE 1
	    for(i=0;i<darwin.projectManagerModule.getNumProjects();i++){
	    	
	    	//get parsed url
	    	parsedUrl = darwin.Facade.parseInputUrl($('#urlField' + i).val());
	    	
	    	//set project info for future reference
	    	darwin.projectManagerModule.setProjectNames(parsedUrl);
	    	
	    	//set request urls for the specefic api request
	    	darwin.projectManagerModule.setBaseRequestUrl(i, "https://api.github.com/repos"+parsedUrl+"/stats/code_frequency?per_page=100&page=")
	    }
	    darwin.Facade.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseContributionData, "contribution");
	       
	    //Load options for commit page
	    darwin.commitManager.loadCommitSelection(darwin.projectManagerModule.getProjectNames());
	    	    
	    //activate tabs at the end of the process
    	darwin.projectManagerModule.enableTabs();
	});
	
	$(".icon").on("click.darwin", function(e){  	
		
		if(darwin.projectManagerModule.getNumProjects() == 5){
			$("#additionalProject").remove();
		} else {
		
			//$('#additionalProject').load('http://localhost:8080/GitHubRepositoryEvolutionWorkBench/html/InputField.html?3');
		
			var feild = '<div  style="margin-top: 0.75%;" class="input-group input-group-lg fields urlInputOne">' + 
			'<span class="input-group-addon glyphicon glyphicon-cog" id="basic-addon1"></span>' +
			'<input type="text" class="form-control" id="urlField' + darwin.projectManagerModule.getNumProjects() + '" placeholder="Extra GitHub repository URL" aria-describedby="basic-addon1">' +
			'</div>';
	    
			$("#additionalProject").before(feild);

			darwin.projectManagerModule.setNumProjects();
		}
	});
});


