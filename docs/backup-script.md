---
# Backup PostgreSQL database script

This script connects to a PostgreSQL database and creates dumps (*.sql* files) in a backup directory.

**'pg_dump' is required to be installed.**

The dumps have the following format *backup\_YEAR\_MONTH\_DAY\_HOUR\_MINNUTE\_SECOND.sql*

Running the script removes any dumps in the backups directory that have been created more than 7 days ago.

## Usage
```bash
$ export DB_NAME=<database name>
$ export DB_USER=<database username>
$ export PGPASSWORD=<database password>
$ python backup_db.py
