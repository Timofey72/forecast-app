# Generated by Django 5.0.1 on 2024-02-05 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weather', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='city',
            name='is_favorite',
            field=models.BooleanField(default=False, verbose_name='Избранное'),
        ),
        migrations.DeleteModel(
            name='Favorite',
        ),
    ]
