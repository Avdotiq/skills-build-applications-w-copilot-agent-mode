from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelSmokeTest(TestCase):
    def test_user_create(self):
        u = User.objects.create(name='Test', email='test@example.com', team='marvel')
        self.assertEqual(u.name, 'Test')
    def test_team_create(self):
        t = Team.objects.create(name='marvel')
        self.assertEqual(t.name, 'marvel')
    def test_activity_create(self):
        a = Activity.objects.create(user_email='test@example.com', activity='run', duration=10)
        self.assertEqual(a.activity, 'run')
    def test_leaderboard_create(self):
        l = Leaderboard.objects.create(team='marvel', points=10)
        self.assertEqual(l.points, 10)
    def test_workout_create(self):
        w = Workout.objects.create(name='Pushup', suggestion='Do 10 pushups')
        self.assertEqual(w.name, 'Pushup')
