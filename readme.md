## KleanMail Bulk Mailer

This is a simple script which works with KleanMail Email Api which checks if an email id is valid or not to prevent soft as well as hard bounce.

Well, there is option for Bulk checker online but it replaces the columns and takes a lot of time so I coded this script to do automate  
my list cleaning on a vps , simply running it on tmux .... lol ...

**data** : this folder will have the file which has email list to be cleaned. 

**output** : This folder will have two list valid and invalid where valid list can be used for mailing. 

You can modify the script as per your needs if you want more columns in output, I just wanted fname, lname and email so I coded as per 
my requirement. 

