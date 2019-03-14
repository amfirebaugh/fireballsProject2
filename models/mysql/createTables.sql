
/* must be created in this order due to foreign key constraint */

USE drugrx_db;

CREATE TABLE user (
  email VARCHAR(255) NOT NULL,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  sex CHAR(1) NOT NULL,

  PRIMARY KEY ( email ) 
);

CREATE TABLE drug (
  email VARCHAR(255) NOT NULL,
  drugname1 VARCHAR(255) NOT NULL,
  drugname2 VARCHAR(255) NOT NULL,
  drugCombo VARCHAR(255) NOT NULL,
  
  PRIMARY KEY ( drugCombo ),
  FOREIGN KEY (email) REFERENCES users(email)
);


