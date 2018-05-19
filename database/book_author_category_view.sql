CREATE 
    ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `virtual_library`.`book_author_category` AS
    SELECT 
        `virtual_library`.`books`.`idbooks` AS `book_id`,
        `virtual_library`.`books`.`title` AS `title`,
        `virtual_library`.`books`.`publish_date` AS `publish_date`,
        `virtual_library`.`books`.`ISBN` AS `ISBN`,
        `virtual_library`.`books`.`publisher` AS `publisher`,
        `virtual_library`.`books`.`synopsis` AS `synopsis`,
        `virtual_library`.`books`.`image` AS `image`,
        `virtual_library`.`books`.`text` AS `text`,
        CONCAT(`virtual_library`.`authors`.`name`,
                ' ',
                `virtual_library`.`authors`.`last_name`) AS `author`,
        `virtual_library`.`authors`.`idauthors` AS `author_id`,
        `virtual_library`.`categories`.`name` AS `category`,
        `virtual_library`.`categories`.`idcategories` AS `category_id`
    FROM
        (((`virtual_library`.`books`
        LEFT JOIN `virtual_library`.`authors` ON ((`virtual_library`.`authors`.`idauthors` = `virtual_library`.`books`.`id_author`)))
        LEFT JOIN `virtual_library`.`categories` ON ((`virtual_library`.`categories`.`idcategories` = `virtual_library`.`books`.`category`)))
        LEFT JOIN `virtual_library`.`book_series` ON ((`virtual_library`.`book_series`.`id_book` = `virtual_library`.`books`.`idbooks`)))