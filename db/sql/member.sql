CREATE TABLE member (
    id BIGSERIAL NOT NULl,
    name TEXT NOT NULL
);

INSERT INTO member VALUES (1, '飯島');

select setval('member_id_seq', (select max(id) + 1 from member));
