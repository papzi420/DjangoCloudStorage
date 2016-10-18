from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.userIndex, name='index'),
	url(r'^login$', views.login, name="login"),
	url(r'^files/(?P<rawPath>.*)$', views.userIndex, name="files"),
	url(r'^createFolder$', views.createFolder, name="createFolder")
]