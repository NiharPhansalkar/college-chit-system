create table faculty_information (
    faculty_id serial primary key,
    email varchar (255) unique not null,
    password varchar (50) not null
);
create table subjects (
    subject_id serial primary key,
    subject_name varchar (255) not null
);
create table faculty_subjects (
    faculty_id int not null,
    subject_id int not null,
    primary key (faculty_id, subject_id),
    foreign key (faculty_id) references faculty_information (faculty_id),
    foreign key (subject_id) references subjects (subject_id)
);
