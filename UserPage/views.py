from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate, login as auth_login
from django.core.urlresolvers import reverse
from .models import UserStorageInfo
from DjangoCloudStorage import settings
from os import listdir
from os.path import isdir, join, basename, getsize, normpath
# Create your views here.


def index(request):
    return HttpResponse("This is the index ")


@login_required
def userIndex(request, path=""):
    files = []
    location = join(settings.STORAGE_LOCATION, UserStorageInfo.objects.get(user=request.user).folderName)
    print(location)
    location = join(location, path)
    print(location)
    if not isdir(location):
        file = open(location, "r")
        response = HttpResponse(file, content_type='application/zip')
        file.close()
        response["Content-Disposition"] = 'attachment; filename=' + basename(location)
        return response
    if not path == "":
        files.append({"name": "..", "size": "420", "isFolder": True})
    for file in listdir(location):
        dir = isdir(join(location, file))
        if dir:
            files.append({"name": file, "size": getsize(join(location, file)), "isFolder": True})
        else:
            files.append({"name": file, "size": "0", "isFolder": False})
    print(path)
    return render(request, "User/index.html", context={"files": files, "currentPath":  normpath(path) + "/"})


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