# Generated by Django 2.0.6 on 2018-06-26 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phame_app', '0004_auto_20180626_1207'),
    ]

    operations = [
        migrations.AlterField(
            model_name='run',
            name='buildSNPdb',
            field=models.CharField(choices=[('0', '0'), ('1', '1')], max_length=1),
        ),
    ]
