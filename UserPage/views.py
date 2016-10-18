from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseNotFound
from django.contrib.auth import authenticate, login as auth_login
from django.core.urlresolvers import reverse
from .models import UserStorageInfo
from DjangoCloudStorage import settings
from os import listdir
import os
# Create your views here.


def index(request):
    return HttpResponse("This is the index ")


@login_required
def createFolder(request):
	if not request.GET.__contains__("path"):
		return HttpResponseNotFound("MalformedRequest");
	path = request.GET["path"];
	location = os.path.join(settings.STORAGE_LOCATION, UserStorageInfo.objects.get(user=request.user).folderName)
	print(os.path.relpath(path, "/"))
	#os.path.

	return HttpResponse(os.path.normpath(os.path.join(location, path)))


@login_required
def userIndex(request, path=""):
    files = []
    folders = []
    location = os.path.join(settings.STORAGE_LOCATION, UserStorageInfo.objects.get(user=request.user).folderName)
    print(location)
    location = os.path.join(location, path)
    print(location)
    if not os.path.isdir(location):
        file = open(location, "r")
        response = HttpResponse(file, content_type='application/zip')
        file.close()
        response["Content-Disposition"] = 'attachment; filename=' + os.path.basename(location)
        return response
    if not path == "":
        folders.append({"name": ".."})
    for file in listdir(location):
        dir = isdir(join(location, file))
        if dir:
            folders.append({"name": file})
        else:
            files.append({"name": file, "size": os.path.getsize(os.path.join(location, file))/1000})
    print(path)
    folders = sorted(folders, key=lambda k: k['name']);
    files = sorted(files, key=lambda k: k['name']);
    return render(request, "User/index.html", context={"files": files, "folders": folders, "currentPath":  normpath(path) + "/"})


def login(request):
    if request.method == "POST":
        if not (request.POST.__contains__("username") and request.POST.__contains__("password")):
            request.COOKIES["LoginError"] = "Oops... Something went wrong please try again."
        else:
            user = authenticate(username=request.POST["username"], password=request.POST["password"])
            if user is not None:
                auth_login(request, user)
                return redirect(reverse("user:index"))
            else:
                request.COOKIES["LoginError"] = "Oops... Something went wrong please try again."
    has_error = request.COOKIES.__contains__("LoginError")
    error = ""
    if has_error:
        error = request.COOKIES.__contains__("LoginError")
    request.COOKIES["LoginError"] = None
    return render(request, "User/login.html", context={"error": error, "has_error": has_error})