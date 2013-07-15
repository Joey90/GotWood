from django.db import models

# Create your models here.

class Tile(models.Model):
    tileId = models.IntegerField(default=0)
    resource = models.IntegerField(default=0)
    diceNumber = models.IntegerField(default=0)
    robber = models.BooleanField(default=False)

class Vertex(models.Model):
    building = models.IntegerField(default=0)
    team = models.IntegerField(default=0)
    tiles = models.ManyToManyField(Tile)

class Edge:
    road = models.BooleanField(default=False)
    team = models.IntegerField(default=0)
    vertices = models.ManyToManyField(Vertex)