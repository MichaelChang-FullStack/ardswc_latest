-- Restore the first database
RESTORE DATABASE Learn_swcb_new
FROM DISK = '/var/opt/mssql/backup/Learn_swcb_new_backup.bak'
WITH MOVE 'Learn_swcb' TO '/var/opt/mssql/data/Learn_swcb_new.mdf',
MOVE 'Learn_swcb_log' TO '/var/opt/mssql/data/Learn_swcb_new.ldf';
GO

-- Restore the second database
RESTORE DATABASE class
FROM DISK = '/var/opt/mssql/backup/class_backup.bak'
WITH MOVE 'class' TO '/var/opt/mssql/data/class.mdf',
MOVE 'class_log' TO '/var/opt/mssql/data/class_log.ldf';
GO
