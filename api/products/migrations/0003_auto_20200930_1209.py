# Generated by Django 2.2.6 on 2020-09-30 12:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_auto_20200913_0934'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='is_bilingual',
        ),
        migrations.RemoveField(
            model_name='product',
            name='is_document',
        ),
        migrations.RemoveField(
            model_name='product',
            name='middleware_service',
        ),
        migrations.AddField(
            model_name='product',
            name='language',
            field=models.CharField(choices=[('BM', 'Bahasa Malaysia'), ('EN', 'English')], default='BM', max_length=2),
        ),
    ]
