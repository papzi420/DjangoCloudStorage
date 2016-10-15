from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class UserStorageInfo(models.Model):
    totalStorageSpace = models.IntegerField(default=5000)
    usedSpace = models.IntegerField(default=0)
    folderName = models.CharField(max_length=256)
    user = models.ForeignKey(User)

    def __str__(self):
        return "Storage for {0} located at '{1}', space used {2}MB of {3}MB"\
            .format(self.user.username, self.folderName,self.usedSpace, self.totalStorageSpace)
