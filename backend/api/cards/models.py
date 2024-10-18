# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from banks.models import Bank

NETWORKS_ACT_VALS = ["Visa", "MasterCard", "AmericanExpress", "Discover", "NoNetwork"]
NETWORKS_READ_VALS = ["Visa", "MasterCard", "American Express", "Discover", "No Network"]
NETWORKS = [(NETWORKS_ACT_VALS[i], NETWORKS_READ_VALS[i]) for i in range(len(NETWORKS_ACT_VALS))]


class Card(models.Model):
    card_id = models.UUIDField(primary_key=True)
    card_name = models.CharField(max_length=100, blank=True, null=True)
    card_bank = models.ForeignKey(Bank, on_delete=models.CASCADE, db_column="card_bank", to_field="bank_name")
    card_brand = models.CharField(max_length=50, blank=True, null=True)
    card_network = models.CharField(choices=NETWORKS, max_length=50, blank=True, null=True)
    card_consumer = models.CharField(max_length=50, blank=True, null=True)
    card_url = models.CharField(max_length=50, blank=True, null=True)
    card_link = models.TextField(blank=True, null=True)
    card_image = models.CharField(max_length=50, blank=True, null=True)
    card_af = models.CharField(max_length=50, blank=True, null=True)
    card_ftf = models.CharField(max_length=50, blank=True, null=True)
    card_btf = models.CharField(max_length=50, blank=True, null=True)
    card_apr = models.CharField(max_length=50, blank=True, null=True)
    card_caf = models.CharField(max_length=50, blank=True, null=True)
    card_lpf = models.CharField(max_length=50, blank=True, null=True)
    card_chip = models.BooleanField(blank=True, null=True)
    card_embossed = models.BooleanField(blank=True, null=True)
    card_material = models.CharField(max_length=50, blank=True, null=True)
    card_il = models.CharField(max_length=30, blank=True, null=True)
    card_ttp = models.BooleanField(blank=True, null=True)
    card_weight = models.IntegerField(blank=True, null=True)
    card_color = models.CharField(max_length=7, blank=True, null=True)
    card_redemption = models.CharField(max_length=50, blank=True, null=True)
    card_caapr = models.CharField(max_length=50, blank=True, null=True)
    card_btapr = models.CharField(max_length=50, blank=True, null=True)
    card_lpapr = models.CharField(max_length=50, blank=True, null=True)
    card_subv = models.IntegerField(blank=True, null=True)
    card_subq = models.IntegerField(blank=True, null=True)
    card_subt = models.IntegerField(blank=True, null=True)
    card_auc = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'cards'

    def __str__(self):
        return self.card_name
