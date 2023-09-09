
### Download the msSQL .bak file
.bak file in the google drive https://drive.google.com/drive/u/0/folders/1zR0QcMsGH70Vdw8IXXwMWIC34EyFk4Lb

* Learn_swcb_new_backup.bak
* class_backup.bak


### Install local env
```
./sh install
```

### Remove local env
```
./sh remove
```

### Reset local env
```
./sh reset
```


### Check restore logic name
```
RESTORE FILELISTONLY
FROM DISK = '/var/opt/mssql/backup/learn_swcb_new.bak';
```
