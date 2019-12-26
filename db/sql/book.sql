CREATE TABLE book (
       id BIGSERIAL NOT NULl,
       title TEXT NOT NULL,
       author TEXT NOT NULL,
       borrow_member_id BIGINT
);

INSERT INTO book VALUES (1, '飯島列伝', '名無しのGonbey', null);
INSERT INTO book VALUES (2, '飯島列伝II', '名無しのGonbey', 1);

select setval('book_id_seq', (select max(id) + 1 from book));
