alter table users
  add column is_system_user boolean default false;

update users set id = 2 where id = 1;
insert into users (id, username, first_name, last_name, password_hash, is_system_user)
  values (1, 'SYSTEM', 'SYSTEM', 'SYSTEM', rpad('DISABLED', 60, '*'), true);
SELECT setval('users_id_seq', (SELECT max(id)
                               FROM users));
