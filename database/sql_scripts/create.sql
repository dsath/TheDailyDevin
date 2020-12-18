CREATE TABLE `blog_posts` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(50) NOT NULL,
        `meta_text` VARCHAR(100),
        `date` VARCHAR(50) NOT NULL default DATE_FORMAT(CURDATE(), '%Y-%m-%d'),
        `html` TEXT NOT NULL,
        `markdown` TEXT NOT NULL,
        `img_path` VARCHAR(50),
        PRIMARY KEY (`id`)
);
