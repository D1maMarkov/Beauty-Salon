# Generated by Django 4.2.7 on 2023-12-15 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('frontend', '0008_rename_review2master_reviewtomaster'),
    ]

    operations = [
        migrations.AlterField(
            model_name='master',
            name='name',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='master',
            name='profession',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='notation',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='frontend.category'),
        ),
        migrations.AlterField(
            model_name='notation',
            name='time',
            field=models.CharField(choices=[('9:30', '9:30'), ('11:30', '11:30'), ('12:30', '12:30'), ('13:30', '13:30'), ('14:30', '14:30'), ('15:30', '15:30'), ('16:30', '16:30'), ('17:30', '17:30'), ('18:30', '18:30'), ('19:30', '19:30'), ('20:30', '20:30'), ('21:30', '21:30'), ('22:30', '22:30')], max_length=150, null=True),
        ),
    ]
