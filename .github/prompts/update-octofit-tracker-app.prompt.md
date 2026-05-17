mode: 'agent'
model: GPT-4.1

# Django App Updates

- Все файлы Django-проекта находятся в директории `octofit-tracker/backend/octofit_tracker`.

1. Обновить `settings.py` для подключения к MongoDB и настройки CORS.
2. Обновить `models.py`, `serializers.py`, `urls.py`, `views.py`, `tests.py`, и `admin.py` для поддержки коллекций users, teams, activities, leaderboard и workouts.
3. Убедиться, что `/` ведёт на api и реализован `api_root` в `urls.py`.
