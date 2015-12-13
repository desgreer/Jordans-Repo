/**
 * 
 */

var darwin = darwin || {};

darwin.dataManager = (function() {
	
	var deletions = [];
	var additions = [];
	var LOC = [];
	var difference = [];
	var commitList = [];
	var starList = [];
	var customDataList = [];
	var customNameList = [];
	var contributionDates = [];
	var forkList = [];
	var TagsList =[];
	var tagSupplement = [];
	var IssuesList = [];

    return {
    	getContributionDates: function (index) {
    		return contributionDates[index];
        },
    	setContributionDates: function (index, data, sampleIndex) {
    		if(contributionDates[index] === undefined)
    			contributionDates[index] = [];
    		
    		contributionDates[index][sampleIndex]  = data;
        },
    	getAllContributionDates: function () {
    		return contributionDates;
        },
    	getAdditions: function (index) {
    		return additions[index];
        },
    	setAdditions: function (index, data, sampleIndex) {
    		if(additions[index] === undefined)
    			additions[index] = [];
    		
    		additions[index][sampleIndex]  = data;
        },
    	getAllAdditions: function () {
    		return additions;
        },
    	getDeletions: function (index) {
    		return deletions[index];
        },
    	setDeletions: function (index, data, sampleIndex) {
    		if(deletions[index] === undefined)
    			deletions[index] = [];
    		
    		deletions[index][sampleIndex]  = data;
        },
    	getAllDeletions: function () {
    		return deletions;
        },
    	getDifference: function (index) {
    		return difference[index];
        },
    	setDifference: function (index, data, sampleIndex) {
    		if(difference[index] === undefined) 		
    			difference[index] = [];
    			
    		difference[index][sampleIndex]  = data;
        },
    	getAllDifference: function () {
    		return difference;
        },
    	getLOCOverTime: function (index) {
    		return LOC[index];
        },
    	setLOCOverTime: function (index, data, sampleIndex) {
    		
    		if(LOC[index] === undefined)
    			LOC[index] = [];
    		
    		LOC[index][sampleIndex] = data;
        },
    	getAllLOCOverTime: function () {
    		return LOC;
        },
    	setCommits: function (index, data, projectNames, SampleIndexCommits) {
    		if(commitList[index] === undefined)
    			commitList[index] = [];

    		commitList[index][SampleIndexCommits]  = data;
        },
    	getCommits: function () {
    		return commitList;
        },
    	getCommitsIndex: function (index) {
    		return commitList[index];
        },
        resetCommitsList : function(){
        	commitList = [];
        },
    	setStars: function (index, data, projectNames, SampleIndex) {
    		if(starList[index] === undefined)
    			starList[index] = [];

    		starList[index][SampleIndex]  = data;
        },
    	getStars: function () {
    		return starList;
        },
    	getStarsIndex: function (index) {
    		return starList[index];
        },
        resetStarsList : function(){
        	starList = [];
        },
    	setForks: function (index, data, projectNames, SampleIndex) {
    		if(forkList[index] === undefined)
    			forkList[index] = [];

    		forkList[index][SampleIndex]  = data;
        },
    	getForks: function () {
    		return forkList;
        },
    	getForksIndex: function (index) {
    		return forkList[index];
        },
        resetForksList : function(){
        	forkList = [];
        },
    	setTags: function (index, data, projectNames, SampleIndex) {
    		if(TagsList[index] === undefined)
    			TagsList[index] = [];

    		TagsList[index][SampleIndex]  = data;
        },
    	getTags: function () {
    		return TagsList;
        },
    	getTagsIndex: function (index) {
    		return TagsList[index];
        },
        resetTagsList : function(){
        	TagsList = [];
        },
    	setIssues: function (index, data, projectNames, SampleIndex) {
    		if(IssuesList[index] === undefined)
    			IssuesList[index] = [];

    		IssuesList[index][SampleIndex]  = data;
        },
    	getIssues: function () {
    		return IssuesList;
        },
    	getIssuesIndex: function (index) {
    		return IssuesList[index];
        },
        resetTagsList : function(){
        	IssuesList = [];
        },
        addToCustomList : function(array){
        	customDataList.push(array);
        },
        clearCustomList : function(){
        	customDataList = [];
        },
        addToCustomNameList : function(name){
        	customNameList.push(name);
        },
        clearCustomNameList : function(){
        	customNameList = [];
        },
        getCustomList : function(){
        	return customDataList;
        },
        getCustomNameList : function(){
        	return customNameList;
        },
        resetAllDataManager : function(){
        	 deletions = [];
        	 additions = [];
        	 LOC = [];
        	 difference = [];
        	 commitList = [];
        	 starList = [];
        	 customDataList = [];
        	 customNameList = [];
        	 contributionDates = [];
        	 forkList = [];
        	 TagsList  =[];
        	 tagSupplment = [];
        	 IssuesList = [];
        }
    };
})(); 