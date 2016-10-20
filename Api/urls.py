from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.index, name='index'),
	url(r'^getContents$', views.getContents, name='getContents'),
	url(r'^createFolder$', views.createFolder, name='createFolder')
]