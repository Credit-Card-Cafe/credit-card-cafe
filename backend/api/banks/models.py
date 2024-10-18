# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
import uuid


class Bank(models.Model):
    bank_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    bank_name = models.CharField(max_length=50, unique=True)
    bank_url = models.CharField(max_length=50, unique=True)
    bank_type = models.CharField(max_length=50, unique=True)

    class Meta:
        managed = False
        db_table = 'banks'

    def __str__(self):
        return self.bank_name
