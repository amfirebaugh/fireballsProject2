
/* must be inserted in this order due to foreign key constraint */

USE drugrx_db;

insert into user (email, firstname, lastname, age, sex) values ('luke@tatooine.com','luke','skywalker',25,'M');
insert into user (email, firstname, lastname, age, sex) values ('admiralAckbar@istatrap.com','admiral','ackbar',100,'F');
insert into user (email, firstname, lastname, age, sex) values ('solo@falcon.com','han','solo',35,'M');
insert into user (email, firstname, lastname, age, sex) values ('mthatcher@theboss.uk','margaret','thatcher',70,'F');
insert into user (email, firstname, lastname, age, sex) values ('mrt@pittythefoo.com','clebber','lang',30,'M');

select * from user;

/* inserts with email foreign key constraint on users table */
insert into drug (drugname1, drugname2, email) values ('zoloft','ibuprofen',(select email from user where email='solo@falcon.com'));
insert into drug (drugname1, drugname2, email) values ('zoloft','ibuprofen',(select email from user where email='luke@tatooine.com'));
insert into drug (drugname1, drugname2, email) values ('warfarin','acetaminophen',(select email from user where email='luke@tatooine.com'));
insert into drug (drugname1, drugname2, email) values ('simvastatin','gemfibrozil',(select email from user where email='solo@falcon.com'));
insert into drug (drugname1, drugname2, email) values ('Clarithromycin','nifedipine',(select email from user where email='admiralAckbar@istatrap.com'));
insert into drug (drugname1, drugname2, email) values ('zoloft','ibuprofen',(select email from user where email='admiralAckbar@istatrap.com'));
insert into drug (drugname1, drugname2, email) values ('levothyroxine','omeprazole',(select email from user where email='mthatcher@theboss.uk'));
insert into drug (drugname1, drugname2, email) values ('warfarin','acetaminophen',(select email from user where email='mrt@pittythefoo.com'));

select * from drug;