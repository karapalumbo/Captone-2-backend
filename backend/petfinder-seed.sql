INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('testuser',
        'test123',
        -- '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'Test',
        'User',
        'test@testuser.com');


INSERT INTO organizations (org_id, name, address, email, phone)
VALUES
        ('IN157', 'Michiana Humane Society and SPCA', '772 IN Hwy 212 Michigan City, IN 46361','pets@michianapets.org', '219-872-4499'), 
        ('PA110', 'Providence Animal Center', '555 Sandy Bank Rd., Media, PA 19063', 'adoptions@providence.org', '610-566-4575'), 
        ('IN157', 'Michiana Humane Society and SPCA', '772 IN Hwy 212 Michigan City, IN 46361','pets@michianapets.org', '219-872-4499'),
        ('PA187', 'Central PA Humane Society', '1837 E Pleasant Valley Blvd., Altoona, PA 16602', 'info@centralpahumane.org', '814-942-5402'),
        ('AZ549', 'Forever Loved Pet Sanctuary', 'PO Box 12142, Scottsdale, AZ 85267', 'adopt@foreverlovedpets.org', null),
        ('OH166', 'Friendship Animal Protective League', '8303 Murray Ridge Rd., Elyria, OH 44035', 'adoptions@friendshipapl.org', '440-322-4321'),
        ('PA110', 'Providence Animal Center', '555 Sandy Bank Rd., Media, PA 19063', 'adoptions@providence.org', '610-566-4575'),
        ('AZ549', 'Forever Loved Pet Sanctuary', 'PO Box 12142, Scottsdale, AZ 85267', 'adopt@foreverlovedpets.org', null),
        ('PA187', 'Central PA Humane Society', '1837 E Pleasant Valley Blvd., Altoona, PA 16602', 'info@centralpahumane.org', '814-942-5402'),
        ('OH166', 'Friendship Animal Protective League', '8303 Murray Ridge Rd., Elyria, OH 44035', 'adoptions@friendshipapl.org', '440-322-4321'), 
        ('CA1649', 'East Bay Rabbit Rescue', 'Livermore, CA 94550', 'eastbayrabbit@gmail.com', null), 
        ('FL1691', 'Sylvester Mission, Inc.', 'Coral Springs, FL 33067', 'sylvestermission@gmail.com', '321-615-6009'),
        ('PA1119', 'East Coast Bulldog Rescue', 'Pittsburgh, PA 15216', 'sara.eastcoastbulldogrescue@gmail.com', '412-657-5205'),
        ('MI27', 'Menominee Animal Shelter, Inc.', 'N 184 Haggerson Ct., Menominee, MI 49858', 'animals@mashelter.org', '906-864-7297'),
        ('IL192', 'Animal House Shelter', '13005 Ernesti Rd., Huntley, IL 60142', 'info@animalhouseshelter.com', '847-961-5541'),
        ('FL1691', 'Sylvester Mission, Inc.', 'Coral Springs, FL 33067', 'sylvestermission@gmail.com', '321-615-6009'),
        ('VA633', 'Washington Area Animal Adoption Group', 'Delaplane, VA 20144', 'waaag@waaag.org', '540-270-2351'),
        ('NY1199', 'Animal Lighthouse Rescue', 'PO Box 30349 New York, NY 1011', 'info@ALRcares.com', null),
        ('FL300', 'Key Largo Animal Shelter', '10591 Overseas Hwy., Key Largo, FL 33037', 'Tfgarr@aol.com', '305-451-0088'),
        ('CA1655', 'Central Valley Rescue Railroad', 'Lindsay, CA 93247', 'cvrr@cvrr.us', '559-799-1775');


INSERT INTO pets (pet_id, name, species, age, gender, color, description, photos, id)
VALUES
    (51012551, 'Rudy', 'Guinea Pig', 'Adult', 'Male', 'Brown', 'My name is Rudy! The humans at the shelter tell me that Im one of the coolest guinea pigs they have ever met.', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012551/1/?bust=1616784128u0026', 1),
    (51012574, 'Lovebug', 'Domestic Short Hair', 'Senior', 'Female', 'Gray', 'Meow. Have you ever seen a kitty as adorable as me?!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012574/2/?bust=1616784281u0026', 2),
    (51012833, 'Izzy', 'Terrier', 'Adult', 'Female', 'Cream', 'Izzy. 4 Years Old. Spayed Female. Terrier Mix. 36 lbs. Since you are reading this, you are obviously looking for me!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012833/1/?bust=1616784627u0026', 3),
    (51012838, 'Violet', 'Domestic Short Hair', 'Adult', 'Female', 'Gray', 'Hi, My name is Violet! I am a 2 year old, front declawed female with LOTS of love to give.', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012838/1/?bust=1616784629u0026', 4),
    (51012585, 'Bebe', 'Cairn Terrier', 'Adult', 'Female', 'Chocolate', 'Bebe came to us at Forever Loved when her owner passed away. Give her a new home today!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012585/1/?bust=1616784394u0026', 5),
    (51012482, 'Tinkerbell', 'Domestic Short Hair', 'Young', 'Female', 'Torbie', 'One -year-old Tinkerbell is about to add some fairy dust to your life! She is a gregarious and friendly lady. See for youself!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51012482/1/?bust=1616783821u0026', 6),
    (51012857, 'Fleetwood Mac', 'Husky', 'Adult', 'Female', 'Black', 'Hello I am Fleetwood Mac! I love to play and howl with my friends. Lets sing together!', 'https://thumbs.dreamstime.com/b/adult-female-husky-blue-eyes-thick-hair-57080369.jpg', 7),
    (51012858, 'Zander', 'Pit Bull Terrier', 'Adult', 'Male', 'Black', 'Fun loving Zander waiting for you to take him home!', 'https://thumbs.dreamstime.com/b/black-pitbull-floor-capture-57944917.jpg', 8),
    (51012855, 'Tank', 'Pit Bull Terrier', 'Adult', 'Male', 'Yellow', 'Hi! My name is Tank and I just arrived at Santa Maria Campus. I am a 4-year-old, Male, American Pit Bull Terrier who loves to play.', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 9),
    (51012856, 'Uma', 'Pit Bull Terrier', 'Adult', 'Female', 'Yellow', 'Hi! My name is Uma and I just arrived at Santa Maria Campus. I am a 2-year-old, female, American Pit Terrier who loves to cuddle.', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 10), 
    (52673930, 'Marge', 'Rabbit', 'Young', 'Female', 'Brown', 'Marge here, and I am ready to bring you a life filled with lots of love.', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52673930/1/?bust=1629050168&', 11), 
    (52673927, 'Latte', 'Domestic Short Hair', 'Baby', 'Female', 'Tortoiseshell', 'This tiny but fierce kitty is the complete package. She is beautiful, playful and loving.', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52673927/1/?bust=1629050146', 12), 
    (52673928, 'Ace', 'Pit Bull Terrier', 'Baby', 'Male', 'Tricolored', 'Ace is a mild mannered, well-behaved puppy who was found as a stray and we guesstimate him to be about a year old.', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 13), 
    (52718299, 'Kang', 'Domestic Medium Hair', 'Baby', 'Male', 'Black', 'Kang may be a small, but his personality is spunky! He loves chasing his toy mice around!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52718299/1/?bust=1629405070', 14),
    (52718296, 'Fido', 'Labrador Retriever', 'Young', 'Male', 'Black and White', 'I am 5 years old and am looking for my forever home.', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52718296/1/?bust=1629405053', 15), 
    (52673923, 'Luna', 'Dachshund', 'Baby', 'Female', 'Black', 'Hi my name is Luna and I love going on walks and playing with toys. I am ready for a fun filled home!', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 16), 
    (52674068, 'Judge', 'American Staffordshire Terrier', 'Adult', 'Male', 'Brown and white', 'Judge is a senior boy who is completely blind. He came to us from a shelter in Southern WVa and is looking for a home with a loving family.', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 17), 
    (52674066, 'Kai', 'Domestic Short Hair', 'Baby', 'Male', 'Tabby', 'Meet baby Kai! He is a 13 week old, 3 pound male and is ready to be adopted!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52674066/1/?bust=1629051099&', 18), 
    (52674065, 'Opal', 'Domestic Short Hair', 'Adult', 'Female', 'Dilute Calico', 'Opal, the sweetest cuddler you will ever meet. She is available for adoption today!', 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/52674065/1/?bust=1629051098&', 19),
    (52674233, 'Elektra', 'Border Collie', 'Baby', 'Female', 'White and brown', 'Elektra is a sweet, petite girl who is a bit shy at first but warms up after a few snuggles.', 'https://mylostpetalert.com/wp-content/themes/mlpa-child/images/nophoto.gif', 20);



INSERT INTO favorites (username, pet_id)
VALUES
        ('testuser', 51012551);


