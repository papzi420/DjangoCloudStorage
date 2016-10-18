$(function () {
	'use strict';
	function navigate(str) {
		console.log(window.location.pathname);
		window.location.href += ((window.location.pathname.endsWith("/")) ? "" : "/") + str;
	}
	
	$(".file").click(function (event) {
		$(".file").removeClass("active");
		$(".folder").removeClass("active");
		var target = $(event.currentTarget);
		console.log(target.attr("filename"));
		target.addClass("active");
		event.stopPropagation();
	}).dblclick(function (event) {
		var filename = $(event.delegateTarget).attr("filename");
		console.log(filename);
		navigate(filename);
	})
	
	$(".folder").click(function (event) {
		$(".file").removeClass("active");
		$(".folder").removeClass("active");
		var target = $(event.currentTarget);
		console.log(target.attr("filename"));
		target.addClass("active");
		event.stopPropagation();
	}).dblclick(function (event) {
		var foldername = $(event.delegateTarget).attr("foldername");
		console.log(foldername);
		navigate(foldername);
	});
	
	$(window).click(function (event) {
		$(".file").removeClass("active");
		$(".folder").removeClass("active");
	});

	
});