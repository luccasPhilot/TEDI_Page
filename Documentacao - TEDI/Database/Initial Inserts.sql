-- Usuário root/admin
INSERT INTO users (id, name, email, password) VALUES
('4swr8aPG', 'Administrador', 'admin@example.com', 'hashed_admin_password');

-- Usuários padrão
INSERT INTO users (id, name, email, password) VALUES
('6Z64J6Lx', 'Alice Santos', 'alice@example.com', 'hashed_password1'),
('DWB99vEy', 'Bruno Lima', 'bruno@example.com', 'hashed_password2'),
('K4Hh4yuk', 'Carla Nunes', 'carla@example.com', 'hashed_password3');

-- Categorias de notícias
INSERT INTO news_categories (id, name) VALUES
('FfCfiPWl', 'Geral'),
('FsFJiB0P', 'Pesquisa');

-- Notícias
INSERT INTO news (id, category_id, title, subtitle, content, image_url) VALUES
('blY2uxtL', 'FfCfiPWl', 'Evento de Inclusão Digital', 'Tecnologia para Todos', 'Hoje tivemos uma oficina prática sobre uso de smartphones.', 'https://example.com/imagens/evento1.jpg'),
('RoNqSm6U', 'FfCfiPWl', 'Novas Turmas Abertas', 'Capacitação para Idosos', 'Abrimos novas vagas para o curso de navegação na internet.', 'https://example.com/imagens/turma2.jpg'),
('Z0W8TzDy', 'FsFJiB0P', 'Parceria com Universidade', 'Fortalecendo o projeto', 'Firmamos parceria com a Universidade XYZ para suporte técnico.', 'https://example.com/imagens/parceria3.jpg');

-- Monitores (sem group_id)
INSERT INTO monitors (id, group_id, name, email, phone_number, cpf, ra, subject, period) VALUES
('TV3Pet7K', NULL, 'Daniel Costa', 'daniel@example.com', '11999990000', '12345678901', '20230001', 'Informática Básica', 7),
('kSpqaQL2', NULL, 'Eduarda Martins', 'eduarda@example.com', '11988881111', '98765432100', '20230002', 'Internet Segura', 3),
('4f3cj1H6', NULL, 'Lucas Ferreira', 'lucas@example.com', '11977772222', '45678912300', '20230003', 'Educação Digital', 5);

-- Membros da equipe (sem group_id)
INSERT INTO team_members (id, group_id, name, ra, image_url, linkedin_url, role_name) VALUES
('rSHXvdoq', NULL, 'Fernanda Souza', '20220001', 'https://example.com/fotos/fernanda.jpg', 'https://linkedin.com/in/fernanda-souza', 'Desenvolvedora'),
('rHDqmNhU', NULL, 'Gustavo Ramos', '20220002', 'https://example.com/fotos/gustavo.jpg', NULL, 'Designer'),
('92mQoz3P', NULL, 'Helena Farias', '20220003', 'https://example.com/fotos/helena.jpg', 'https://linkedin.com/in/helena-farias', 'Coordenadora');
