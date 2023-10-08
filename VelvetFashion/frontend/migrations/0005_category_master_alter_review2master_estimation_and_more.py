# Generated by Django 4.2 on 2023-10-06 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0004_remove_review2master_usersphoto_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Master',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('profession', models.CharField(max_length=150)),
                ('photo', models.ImageField(null=True, upload_to='masterPhotos/%Y/%m/%d')),
                ('biography', models.CharField(max_length=50000)),
            ],
        ),
        migrations.AlterField(
            model_name='review2master',
            name='estimation',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='estimation',
            field=models.IntegerField(null=True),
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('photo', models.ImageField(null=True, upload_to='servicePhotos/%Y/%m/%d')),
                ('price', models.IntegerField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='frontend.category')),
            ],
        ),
        migrations.AlterField(
            model_name='review2master',
            name='master',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='frontend.master'),
        ),
    ]