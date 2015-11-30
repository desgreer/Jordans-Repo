/**
 * 
 */

var darwin = darwin || {};

darwin.Mediator = (function () {
    return {
    	makeServerRequest: function (action, callback, type, input) {
    		darwin.serverModule.send(action, callback, type, input);
        },
		authenticateUpdateView: function (response) {
			json = JSON.parse(response);

			if(json.outcome == "true" && json.action == "login"){
				window.location = "http://localhost:8080/GitHubRepositoryEvolutionWorkBench/jsp/QueryPage.jsp";
			} else {
		     	$('#ajaxGetUserServletResponse').text(json.message);
		      	$("#ajaxGetUserServletResponse").css({"opacity":"1"});
			}
		},
		updateProgressBar: function () {
			darwin.progressbarModule.updateProgressBar();
		},
		makeGithubRequest: function (url, type, callback, action) {
			for(i=0;i<url.length;i++){
								
				//stops race conditions
				timer = setTimeout(darwin.projectManagerModule.noCallBack(), 100);

				//only perform actually call back when all request data collected
				if(i==(url.length-1)){
					if(action == "commit" || "star"){
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, callback, i, action);
					} else {
						darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, callback, i, action);
					}
				} else {
					darwin.githubModule.send(url[i] + darwin.projectManagerModule.getcurrRequestPage(), type, darwin.projectManagerModule.noCallBack, i, action);					
				}	
			}
		},
		githubParseContributionData: function (response) {
			darwin.contributionExtractorModule.extract(response);
		},
		githubParseCommitData: function (response, index, action) {
			darwin.genericExtractorModule.extract(response, index, action);
		},
		githubParseStarData: function (response, index) {
			darwin.starExtractorModule.extract(response, index);
		},
		drawContributionGraph: function (values, xAxis, chartTitle, LOC, totalLines, sampleIndex) {			
			darwin.ContributionVisualiser.draw(values, xAxis, chartTitle, sampleIndex);	
			
			if(values.length == 1){
				darwin.ContributionVisualiser.populateSupplementaryStats(LOC,totalLines);
			}
		},
		drawGenericGraph: function (values, xAxis, chartTitle, sampleIndex, action) {			
			darwin.genericVisualiser.draw(values, xAxis, chartTitle, sampleIndex, action);	
		},
		drawStarGraph: function (values, xAxis, chartTitle, sampleIndex) {			
			console.log("a");
		},
		loadGraphLibrary: function(){
			darwin.loadGraphModule.load();
		},
		resetVariables: function(){
			darwin.projectManagerModule.resetProjectNames();
			darwin.projectManagerModule.resetNumProjects();
			darwin.dataManager.resetAllDataManager();
			darwin.projectManagerModule.resetCommitProjectsAdded();
			darwin.projectManagerModule.resetStarProjectsAdded();
			darwin.projectManagerModule.setSampleIndex(0);
			darwin.jsonManagerModule.resetAllData();
			darwin.contributionExtractorModule.resetVariables();
			darwin.projectManagerModule.resetAllProjectManager();
			darwin.customTabModule.resetCustomTabData();
		},
		resampleCommits : function(currentJson){
			//pass in commits one at a time
			for(var i =0; i<currentJson.length;i++){
				darwin.genericExtractorModule.extract(currentJson[i],i);
			}
		},
		parseInputUrl : function(url){
			return darwin.ParseUrlInputModule.parse(url);
		},
		packager : function(seriesA, SeriesB, seriesC, seriesD ,dataType){
			if(dataType == "contributions"){
				darwin.packager.contributions(seriesA, SeriesB, seriesC,seriesD);
			}
		},
		packagerCommits : function(dates, commits,dataType){
			darwin.packager.commits(dates, commits,dataType);
		},
		emptyCallback : function(){
			
		},
		setContributionDetails: function(index, additions, deletions, difference, LOCOverTime, sampleIndex, contributionDates){
			darwin.dataManager.setAdditions(index, additions, sampleIndex);
			darwin.dataManager.setDeletions(index, deletions, sampleIndex);
			darwin.dataManager.setDifference(index, difference, sampleIndex);
			darwin.dataManager.setLOCOverTime(index, LOCOverTime, sampleIndex);	
			darwin.dataManager.setContributionDates(index, contributionDates, sampleIndex);
		},
		setCommitDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setCommits(index, commits, projectNames, sampleIndex);
		},
		setStarDetails : function(index, commits, projectNames, sampleIndex){
			darwin.dataManager.setStars(index, commits, projectNames, sampleIndex);
		},
		getCommitDetails : function(){
			return darwin.dataManager.getCommits();
		},
		getStarDetails : function(){
			return darwin.dataManager.getStars();
		},
		setNumCommitProjectSelected : function(){
			darwin.projectManagerModule.setCommitProjectsAdded(darwin.Mediator.getNumCommitProjectSelected + 1);
		},
		getNumCommitProjectSelected : function(){
			return darwin.projectManagerModule.getCommitProjectsAdded();
		},
		getNumStarProjectSelected : function(){
			return darwin.projectManagerModule.getStarProjectsAdded();
		},
		setNumStarProjectSelected : function(){
			darwin.projectManagerModule.setStarProjectsAdded();
		},
		getSmallestArray : function(json){
			return darwin.arrayUtilityModule.getSmallestArray(json);
		},
		performSuccessAction : function(action, response, callback, index){
			darwin.AjaxResponseModule.handleSuccess(action, response, callback, index);
		},
		setContributionJson : function(index, response){
			darwin.jsonManagerModule.setContributionJson(index,response)
		},
		setCommitJson : function(index, response){
			darwin.jsonManagerModule.setCommitJson(index,response)
		},
		setStarJson : function(index, response){
			darwin.jsonManagerModule.setStarJson(index,response)
		},
		resetcurrRequestPage : function(index){
			darwin.projectManagerModule.resetcurrRequestPage(index);
		},
		getAllCommitJson : function(){
			return darwin.jsonManagerModule.getAllCommitJson()
		},
		getIndexCommitJson : function(index){
			return darwin.jsonManagerModule.getCommitJson(index)
		},
		getStarJson : function(){
			return darwin.jsonManagerModule.getStarJson()
		},
		setcurrRequestPage : function(val){
			darwin.projectManagerModule.setcurrRequestPage(val);
		},
		getcurrRequestPage : function(){
			return darwin.projectManagerModule.getcurrRequestPage();
		},
		getAllBaseRequestUrl : function(index){
			return darwin.projectManagerModule.getAllBaseRequestUrl(index)
		},
		makeGithubRequestSingleUrl : function(url, type, callback, index, action){
			  darwin.githubModule.send(url, type, callback, index, action);
		},
		prepareCommitClick : function(url){
			darwin.jsonManagerModule.resetCommitJson(url);
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.Mediator.disableCommitButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "commit");		
		},
		prepareStarClick : function(url){
			darwin.jsonManagerModule.resetStarJson();
			darwin.projectManagerModule.resetBaseRequestUrl();
			darwin.projectManagerModule.disableStarButton();
			
			darwin.projectManagerModule.setBaseRequestUrl(0,url);
			
			darwin.Mediator.makeGithubRequest(darwin.projectManagerModule.getAllBaseRequestUrl(), "GET", darwin.Mediator.githubParseCommitData, "star");		
		},
		disableCommitButton : function(){
			darwin.projectManagerModule.disableCommitButton();
		},
		enableButtons : function(){
			darwin.projectManagerModule.enableButtons();
		},
		setupCustomComponentsOptions : function(){
			darwin.customTabModule.setupUiOptions();
		},
		setupCustomComponentsDropDown : function(){
			darwin.customTabModule.setupUiDropDown();
		},
		clearComponents : function(){
			darwin.customTabModule.clearComponents();
		},
		clearOptionsOnly : function(){
			darwin.customTabModule.clearOptionsOnly();
		},
		getCommitsIndex : function(index){
			return darwin.dataManager.getCommitsIndex(index);
		},
		addToCustomList : function(array, name){
			darwin.dataManager.addToCustomList(array);
			darwin.dataManager.addToCustomNameList(name);
		},
		drawCustomGraph: function (values, xAxis, chartTitle, sampleIndex) {			
			darwin.customVisualiser.draw(values, xAxis, chartTitle, sampleIndex);	
		},
		resetCustomProcess : function(){
			darwin.dataManager.clearCustomNameList();
			darwin.customTabModule.removeChecks();
		},
		resetCustomList: function(){
			darwin.dataManager.clearCustomList();
		},
		setCurrentCustomSearch : function(val){
			darwin.customTabModule.setIsOnCustom(val);
		},
		getCurrentCustomSearch : function(){
			return darwin.customTabModule.getIsOnCustom();
		},
		copyObject : function(obj){
			return darwin.copyObjectModule.copyObject(obj);
		}
    };
})();