class FileExplorerApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { folders: [], files: [] };
		$.get("/api/getContents?path=" + currentPath, function(data, status){
			this.setState({ files: data["files"], folders: data["folders"] });
		}.bind(this));
	}
	render() {
		return (
			<div>
				<div classname="col-md-12">
					<p>Folders</p>
				</div>		
				<FolderList folders={this.state.folders} />
				<div classname="col-md-12">
					<p>Files</p>
				</div>
				<FilesList files={this.state.files} />
			</div>
		);
	}
}

class FolderList extends React.Component {
	render() {
		return (
			<div className="folder-list col-md-12">
				{this.props.folders.map(folder => (
					<div className="folder col-md-2" foldername="{folder.name}">
						<div className="body">
							{folder.name}
						</div>
					</div>
				))}
			</div>
		);
	}
}

class FilesList extends React.Component {
	render() {
		return (
			<div className="file-list col-md-12">
				{this.props.files.map(file => (
					<div className="file col-md-2" filename="{file.name}">
						<div className="body">
							{file.size}
						</div>
						<div className="head">
							{file.name}
						</div>
					</div>
				))}
			</div>
		);
	}
}
ReactDOM.render(<FileExplorerApp />, document.getElementById('drive-background'));
$(function () {
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
})

