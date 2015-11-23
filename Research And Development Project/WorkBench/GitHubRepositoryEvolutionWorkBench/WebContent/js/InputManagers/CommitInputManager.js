/**
 * This file handles the various input that can be performed on the commit tab
 */

var darwin = darwin || {};

$(document).ready(function(e) {
	
	$(document).on("click.darwin","#commitOption1", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption1").text()+"/commits?per_page=100&page=");	

	});
	$(document).on("click.darwin","#commitOption2", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption2").text()+"/commits?per_page=100&page=");	
	
	});
	$(document).on("click.darwin","#commitOption3", function () {		
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption3").text()+"/commits?per_page=100&page=");	
	});
	$(document).on("click.darwin","#commitOption4", function () {
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption4").text()+"/commits?per_page=100&page=");	

	});
	$(document).on("click.darwin","#commitOption5", function () {			
		darwin.Mediator.prepareCommitClick("https://api.github.com/repos"+$("#commitOption5").text()+"/commits?per_page=100&page=");	
	});	
	$('#sampleRate1Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
		darwin.projectManagerModule.setCommitSamplingRate(1);	
		darwin.Mediator.resampleCommits(darwin.jsonManagerModule.getAllCommitJson());
	});	
	$('#sampleRate2Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
		darwin.projectManagerModule.setCommitSamplingRate(6);	
		darwin.Mediator.resampleCommits(darwin.jsonManagerModule.getAllCommitJson());
	});	
	$('#sampleRate3Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
		darwin.projectManagerModule.setCommitSamplingRate(13);	
		darwin.Mediator.resampleCommits(darwin.jsonManagerModule.getAllCommitJson());
	});	
	$('#sampleRate4Commits').on("click.darwin", function(e){
		e.preventDefault();

		darwin.projectManagerModule.setCommitExtractorType(true);
		darwin.projectManagerModule.setCommitSamplingRate(26);	
		darwin.Mediator.resampleCommits(darwin.jsonManagerModule.getAllCommitJson());
	});	
});