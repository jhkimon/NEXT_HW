# Generated by Django 5.0.3 on 2024-04-08 16:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blogApp', '0007_alter_comment_article_alter_reply_article'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='user',
            field=models.CharField(default='익명', max_length=20),
        ),
        migrations.AlterField(
            model_name='reply',
            name='user',
            field=models.CharField(default='익명', max_length=20),
        ),
    ]