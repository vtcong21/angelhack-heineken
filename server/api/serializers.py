#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 29 20:25:32 2024

@author: dangkhoa
"""
from rest_framework import serializers
from .models import *

class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedImage
        fields = ('id', 'image', 'uploaded_at')