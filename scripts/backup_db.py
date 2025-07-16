import os
import subprocess
import datetime

DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "postgres")
BACKUP_DIR = os.getenv("DB_BACKUP_DIR", "backups")
RETENTION_DAYS = 7


def create_backup():
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    backup_file = os.path.join(BACKUP_DIR, f"backup_{timestamp}.sql")

    # Copy env variables to ensure that we get $PGPASSWORD
    env = os.environ.copy()
    with open(backup_file, 'w') as f:
        subprocess.run([
            "pg_dump",
            "-U", DB_USER,
            "-d", DB_NAME
        ], stdout=f, env=env)

    print(f"Backup created: {backup_file}")


def cleanup_old_backups():
    now = datetime.datetime.now()
    for filename in os.listdir(BACKUP_DIR):
        if filename.startswith("backup_") and filename.endswith(".sql"):
            filepath = os.path.join(BACKUP_DIR, filename)
            created = datetime.datetime.fromtimestamp(os.path.getctime(filepath))
            age = (now - created).days
            if age > RETENTION_DAYS:
                os.remove(filepath)
                print(f"Deleted old backup: {filepath}")


def main():
    if not os.path.exists(BACKUP_DIR):
        os.makedirs(BACKUP_DIR)
    
    create_backup()
    cleanup_old_backups()


if __name__ == "__main__":
    main()

