# Generated by Django 2.0.6 on 2018-06-27 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('phame_app', '0010_auto_20180627_1554'),
    ]

    operations = [
        migrations.AddField(
            model_name='run',
            name='aligner',
            field=models.CharField(choices=[('bowtie', 'bowtie'), ('FastTree', 'FastTree'), ('minimap2', 'minimap2')], default='bowtie', max_length=20),
        ),
    ]
