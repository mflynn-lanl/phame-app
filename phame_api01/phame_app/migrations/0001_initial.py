# Generated by Django 2.0.6 on 2018-06-25 15:47

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Run',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ref_dir', models.FileField(upload_to='')),
                ('work_dir', models.FileField(upload_to='')),
                ('reference', models.CharField(max_length=6)),
                ('project', models.CharField(max_length=20)),
                ('cds_snps', models.BooleanField(default=False)),
                ('buildSNPdb', models.BooleanField(default=False)),
                ('first_time', models.BooleanField(default=True)),
                ('data', models.CharField(choices=[('0', 'F'), ('1', 'C'), ('2', 'R'), ('3', 'F+C'), ('4', 'F+R'), ('5', 'C+R'), ('6', 'F+C+R'), ('7', 'realignment')], max_length=20)),
                ('reads', models.CharField(choices=[('1', 'single_reads'), ('2', 'paired_reads'), ('3', 'both')], max_length=20)),
                ('tree', models.CharField(choices=[('0', 'None'), ('1', 'FastTree'), ('2', 'RAxML'), ('3', 'both')], max_length=20)),
                ('bootstrap', models.BooleanField(default=False)),
                ('N', models.IntegerField(default=100)),
                ('pos_select', models.CharField(choices=[('0', 'None'), ('1', 'PAML'), ('2', 'HyPhy'), ('3', 'both')], max_length=20)),
                ('code', models.CharField(choices=[('0', 'Bacteria'), ('1', 'Virus')], max_length=20)),
                ('clean', models.BooleanField(default=False)),
                ('threads', models.IntegerField(default=2)),
                ('cutoff', models.FloatField(default=0.1)),
            ],
        ),
    ]
