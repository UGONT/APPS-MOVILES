from django.db import models

# Create your models here.
class Usuario(models.Model):
    user = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.TextField()

    def __str__(self):
        return self.user