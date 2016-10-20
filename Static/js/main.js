"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileExplorerApp = function (_React$Component) {
	_inherits(FileExplorerApp, _React$Component);

	function FileExplorerApp(props) {
		_classCallCheck(this, FileExplorerApp);

		var _this = _possibleConstructorReturn(this, (FileExplorerApp.__proto__ || Object.getPrototypeOf(FileExplorerApp)).call(this, props));

		_this.state = { folders: [], files: [] };
		$.get("/api/getContents?path=" + currentPath, function (data, status) {
			this.setState({ files: data["files"], folders: data["folders"] });
		}.bind(_this));
		return _this;
	}

	_createClass(FileExplorerApp, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"div",
					{ classname: "col-md-12" },
					React.createElement(
						"p",
						null,
						"Folders"
					)
				),
				React.createElement(FolderList, { folders: this.state.folders }),
				React.createElement(
					"div",
					{ classname: "col-md-12" },
					React.createElement(
						"p",
						null,
						"Files"
					)
				),
				React.createElement(FilesList, { files: this.state.files })
			);
		}
	}]);

	return FileExplorerApp;
}(React.Component);

var FolderList = function (_React$Component2) {
	_inherits(FolderList, _React$Component2);

	function FolderList() {
		_classCallCheck(this, FolderList);

		return _possibleConstructorReturn(this, (FolderList.__proto__ || Object.getPrototypeOf(FolderList)).apply(this, arguments));
	}

	_createClass(FolderList, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "folder-list col-md-12" },
				this.props.folders.map(function (folder) {
					return React.createElement(
						"div",
						{ className: "folder col-md-2", foldername: "{folder.name}" },
						React.createElement(
							"div",
							{ className: "body" },
							folder.name
						)
					);
				})
			);
		}
	}]);

	return FolderList;
}(React.Component);

var FilesList = function (_React$Component3) {
	_inherits(FilesList, _React$Component3);

	function FilesList() {
		_classCallCheck(this, FilesList);

		return _possibleConstructorReturn(this, (FilesList.__proto__ || Object.getPrototypeOf(FilesList)).apply(this, arguments));
	}

	_createClass(FilesList, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "file-list col-md-12" },
				this.props.files.map(function (file) {
					return React.createElement(
						"div",
						{ className: "file col-md-2", filename: "{file.name}" },
						React.createElement(
							"div",
							{ className: "body" },
							file.size
						),
						React.createElement(
							"div",
							{ className: "head" },
							file.name
						)
					);
				})
			);
		}
	}]);

	return FilesList;
}(React.Component);

ReactDOM.render(React.createElement(FileExplorerApp, null), document.getElementById('drive-background'));
$(function () {
	function navigate(str) {
		console.log(window.location.pathname);
		window.location.href += (window.location.pathname.endsWith("/") ? "" : "/") + str;
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
	});

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