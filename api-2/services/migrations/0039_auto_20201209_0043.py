# Generated by Django 2.2.6 on 2020-12-09 00:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0038_auto_20201029_2316'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentrequest',
            name='officer_department',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='documentrequest',
            name='officer_designation',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='documentrequest',
            name='officer_mobile_no',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='documentrequest',
            name='officer_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='documentrequest',
            name='officer_nric',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='documentrequest',
            name='officer_official_email',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
