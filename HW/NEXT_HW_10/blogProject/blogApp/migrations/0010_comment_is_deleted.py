# Generated by Django 5.0.3 on 2024-04-09 01:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogApp', '0009_rename_article_reply_comment'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='is_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
