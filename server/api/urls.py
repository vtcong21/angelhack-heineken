#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 29 19:57:46 2024

@author: dangkhoa
"""
from django.urls import path,include
from .views import *
urlpatterns = [
    path('upload/', ImageUploadView.as_view(), name='image-upload'),
]
