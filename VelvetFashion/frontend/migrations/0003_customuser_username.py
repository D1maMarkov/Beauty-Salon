# Generated by Django 4.2 on 2023-10-06 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0002_customuser_alter_review2master_username_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='username',
            field=models.CharField(max_length=150, null=True),
        ),
    ]