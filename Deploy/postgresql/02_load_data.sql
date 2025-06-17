INSERT INTO users (id, name, email, password) VALUES (1, 'Tedi Root User', 'tedi@gmail.com', '$2b$10$VW6wND8SssfBOQl9tLEY2uv4glpGTbtJ.aBOLnqIGaBseh0ewnztu');

INSERT INTO news_categories (id, name)
VALUES (substring(md5(random()::text) from 1 for 8), 'Geral'),
(substring(md5(random()::text) from 1 for 8), 'Pesquisa')