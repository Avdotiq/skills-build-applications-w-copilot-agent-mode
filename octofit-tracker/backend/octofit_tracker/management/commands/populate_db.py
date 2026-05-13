from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from django.conf import settings

from pymongo import MongoClient

# Sample data
USERS = [
    {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
    {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
    {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "dc"},
    {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
    {"name": "Steve Rogers", "email": "captainamerica@marvel.com", "team": "marvel"},
    {"name": "Peter Parker", "email": "spiderman@marvel.com", "team": "marvel"},
]

TEAMS = [
    {"name": "marvel"},
    {"name": "dc"},
]

ACTIVITIES = [
    {"user_email": "superman@dc.com", "activity": "Flight", "duration": 60},
    {"user_email": "batman@dc.com", "activity": "Martial Arts", "duration": 45},
    {"user_email": "ironman@marvel.com", "activity": "Suit Training", "duration": 30},
]

LEADERBOARD = [
    {"team": "marvel", "points": 100},
    {"team": "dc", "points": 90},
]

WORKOUTS = [
    {"name": "Super Strength", "suggestion": "Lift heavy objects"},
    {"name": "Agility", "suggestion": "Parkour training"},
]

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Очистка коллекций
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Вставка тестовых данных
        db.users.insert_many(USERS)
        db.teams.insert_many(TEAMS)
        db.activities.insert_many(ACTIVITIES)
        db.leaderboard.insert_many(LEADERBOARD)
        db.workouts.insert_many(WORKOUTS)

        # Уникальный индекс по email
        db.users.create_index([("email", 1)], unique=True)

        self.stdout.write(self.style.SUCCESS('octofit_db успешно заполнена тестовыми данными!'))
