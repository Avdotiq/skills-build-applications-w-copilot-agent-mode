from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

# Sample data
USERS = [
    {"name": "Clark Kent", "email": "superman@dc.com", "team": "dc"},
    {"name": "Bruce Wayne", "email": "batman@dc.com", "team": "dc"},
    {"name": "Diana Prince", "email": "wonderwoman@dc.com", "team": "dc"},
    {"name": "Barry Allen", "email": "flash@dc.com", "team": "dc"},
    {"name": "Tony Stark", "email": "ironman@marvel.com", "team": "marvel"},
    {"name": "Steve Rogers", "email": "captainamerica@marvel.com", "team": "marvel"},
    {"name": "Peter Parker", "email": "spiderman@marvel.com", "team": "marvel"},
    {"name": "Natasha Romanoff", "email": "blackwidow@marvel.com", "team": "marvel"},
]

TEAMS = [
    {"name": "marvel"},
    {"name": "dc"},
]

ACTIVITIES = [
    {"user_email": "superman@dc.com", "activity": "Flight", "duration": 60},
    {"user_email": "batman@dc.com", "activity": "Martial Arts", "duration": 45},
    {"user_email": "wonderwoman@dc.com", "activity": "Lasso Training", "duration": 50},
    {"user_email": "flash@dc.com", "activity": "Speed Run", "duration": 35},
    {"user_email": "ironman@marvel.com", "activity": "Suit Training", "duration": 30},
    {"user_email": "captainamerica@marvel.com", "activity": "Shield Practice", "duration": 40},
    {"user_email": "spiderman@marvel.com", "activity": "Web Swinging", "duration": 25},
    {"user_email": "blackwidow@marvel.com", "activity": "Stealth Drills", "duration": 55},
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
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        for data in USERS:
            User.objects.create(**data)
        for data in TEAMS:
            Team.objects.create(**data)
        for data in ACTIVITIES:
            Activity.objects.create(**data)
        for data in LEADERBOARD:
            Leaderboard.objects.create(**data)
        for data in WORKOUTS:
            Workout.objects.create(**data)

        self.stdout.write(self.style.SUCCESS('octofit_db успешно заполнена тестовыми данными!'))
