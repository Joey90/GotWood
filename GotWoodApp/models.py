from django.db import models

# Create your models here.
class Tile(models.Model):
    id = models.IntegerField
    resource = models.IntegerField
    diceNumber = models.IntegerField
    robber = models.BooleanField

class Vertex(models.Model):
    building = models.IntegerField
    team = models.IntegerField

class Edge:
    road = models.BooleanField
    team = models.IntegerField