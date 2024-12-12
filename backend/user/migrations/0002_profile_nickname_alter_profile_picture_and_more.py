# Generated by Django 5.1.2 on 2024-11-20 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0004_rename_number_pages_bookedition_numberpages'),
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='nickname',
            field=models.CharField(default='', max_length=256),
        ),
        migrations.AlterField(
            model_name='profile',
            name='picture',
            field=models.ImageField(default='images/default-user.jpg', upload_to='images/'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='savedBookEditions',
            field=models.ManyToManyField(to='books.bookedition'),
        ),
    ]