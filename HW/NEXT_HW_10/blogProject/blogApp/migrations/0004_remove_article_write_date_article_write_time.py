# Generated by Django 5.0.3 on 2024-03-28 16:44

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogApp', '0003_article_write_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='article',
            name='write_date',
        ),
        migrations.AddField(
            model_name='article',
            name='write_time',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]