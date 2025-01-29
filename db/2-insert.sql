USE Discreta;

INSERT IGNORE INTO ADMIN VALUES (
    1, "admin@discretarit.com", "9c362ca3d6158cf8c1a31af37374bbd4686f9d88e3e2382c7a6425e7fdd87eb0"
);

INSERT IGNORE INTO STUDENT VALUES (
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "abc", "abc@gmail.com", "d24bd97b5fb24761112354dec329c70a5c6e2dedcc9a6df160eefd1d671efe56"
);

INSERT IGNORE INTO GAMES VALUES (1, 'Permutation Puzzle', 'A game involving the arrangement of objects in a specific order.', 'Medium', 10);

INSERT IGNORE INTO GAMES VALUES (2, 'Lattice Builder', 'A game involving the arrangement of objects in a specific order.', 'Medium', 15);

INSERT IGNORE INTO GAMES VALUES (3, 'Poset Builder', 'A game involving the construction of partially ordered sets (posets) from given elements.', 'Medium', 20);

INSERT IGNORE INTO METRICS (SToken, LastActive) VALUES ('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', NOW())
