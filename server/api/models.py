from django.db import models

# Create your models here.

class UploadedImage(models.Model):
    image = models.ImageField(upload_to='images/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
class Tag(models.Model):
    image = models.OneToOneField(
        UploadedImage,
        on_delete=models.CASCADE,
        primary_key=True,
    )