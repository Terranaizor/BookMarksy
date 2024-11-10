#!/bin/bash

# Run migrations and load data
python3 manage.py migrate --noinput
python3 manage.py loaddata /app/backup/data_backup.json

# Trap the SIGTERM signal to create the backup before the container stops

shutdown() {
  echo "Saving data backup..."
  python3 manage.py dumpdata --output=/app/backup/data_backup.json
  echo "Backup saved. Shutting down..."
}

# Set up the trap for SIGTERM and SIGINT (for graceful shutdown)
trap shutdown SIGTERM SIGINT
# Start the Django server
exec python3 manage.py runserver 0.0.0.0:8000 &

wait $!