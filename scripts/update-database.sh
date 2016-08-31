#!/bin/sh
DBNAME=softpath_test
USER=softpath_user
PASSWORD=softpath_pass
cd /home/ec2-user/softpath-generic-app/database/schema/softpath
liquibase --url="jdbc:mysql://localhost:3306/$DBNAME?createDatabaseIfNotExist=true" --username="$USER" --password="$PASSWORD" --changeLogFile=softpath.xml $1 $2
