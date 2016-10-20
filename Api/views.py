from django.shortcuts import render
from django.shortcuts import HttpResponse
from django.contrib.auth.decorators import login_required
from UserPage import securityUtils
from DjangoCloudStorage import settings
from UserPage.models import UserStorageInfo
import json
import time
import os
# Create your views here.

def index(request):
	return HttpResponse(json.dumps({"status": "success", "message": "The api is working!"}), content_type="application/json")

@login_required
def getContents(request):
	start = time.time();
	if not request.GET.__contains__("path"):
		return HttpResponse(json.dumps({"status": "error", "message": "MalformedRequest"}), content_type="application/json");
	start = time.time()
	path = securityUtils.pathSecurity.preventTraversal(request.GET["path"]);
	location = os.path.join(settings.STORAGE_LOCATION, UserStorageInfo.objects.get(user=request.user).folderName)
	location = os.path.join(location, path)
	print(location)
	if not os.path.exists(location):
		return HttpResponse(json.dumps({"status": "error", "message": "DoesNotExist"}), content_type="application/json")
	
	if not os.path.isdir(location):
		file = open(location, "r")
		response = HttpResponse(file, content_type='application/zip')
		file.close()
		response["Content-Disposition"] = 'attachment; filename=' + os.path.basename(location)
		return response
	folders = []
	files = []
	if not path == "":
		folders.append({"name": ".."})
	for file in os.listdir(location):
		dir = os.path.isdir(os.path.join(location, file))
		if dir:
			folders.append({"name": file})
		else:
			files.append({"name": file, "size": os.path.getsize(os.path.join(location, file))/1000})
	folders = sorted(folders, key=lambda k: k['name']);
	files = sorted(files, key=lambda k: k['name']);
	print("time: " + str(time.time() - start))
	return HttpResponse(json.dumps({"status": "success", "files": files, "folders": folders}), content_type="application/json")

@login_required
def createFolder(request):
	if not request.GET.__contains__("path"):
		return HttpResponse(json.dumps({"status": "success", message: "MalformedRequest"}), content_type="application/json")
	start = time.time()
	path = pathSecurity.preventTraversal(request.GET["path"]);
	location = os.path.join(settings.STORAGE_LOCATION, UserStorageInfo.objects.get(user=request.user).folderName)
	location = os.path.join(location, path)
	if os.path.exists(location):
		return HttpResponse(json.dumps({"status": "success", message: "AlreadyExists"}), content_type="application/json")
	if not os.path.exists(os.path.split(location)[0]):
		return HttpResponse(json.dumps({"status": "success", message: "DirectoryNotExisting"}), content_type="application/json")
	os.mkdir(location)
	print(time.time() - start)
	return HttpResponse(json.dumps({"status": "success"}), content_type="application/json")