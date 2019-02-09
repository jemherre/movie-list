DROP DATABASE IF EXISTS movie_list;
DROP TABLE IF EXISTS Movies;

/* create database*/
CREATE DATABASE movie_list;

USE movie_list;

/*create table - pid - name - status*/
CREATE TABLE Movies (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(20),
    status VARCHAR(20),
    PRIMARY KEY (id)
);



