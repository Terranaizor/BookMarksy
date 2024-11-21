#!/bin/bash

/app/wait-for-it.sh db:5432 --timeout=30 --strict --

# Run migrations and load data
python3 manage.py migrate --noinput
python3 manage.py loaddata /app/backup/data_backup.json

# Trap the SIGTERM signal to create the backup before the container stops

shutdown() {
  if python3 -c "import django; django.setup(); from django.db import connections; connections['default'].cursor().execute('SELECT 1')" &> /dev/null; then
    python3 manage.py dumpdata  --output=/app/backup/data_backup.json
    fi
}
# --exclude contenttypes --exclude auth.Permission
# Set up the trap for SIGTERM and SIGINT (for graceful shutdown)
trap shutdown SIGTERM SIGINT
# Start the Django server
exec python3 manage.py runserver 0.0.0.0:8000 &

wait $!