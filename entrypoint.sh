#!/bin/bash

/opt/mssql/bin/sqlservr &

sleep 30s

/opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'Swcb2022Learn' -i /var/opt/mssql/backup/restore-database.sql

tail -f /dev/null
