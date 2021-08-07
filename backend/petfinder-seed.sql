INSERT INTO users (username, password, email)
VALUES ('testuser',
        '$2b$12$AZH7virni5jlTTiGgEg4zu3lSvAw68qVEfSIOjJ3RqtbJbdW/Oi5q',
        'joel@joelburton.com');


INSERT INTO pets (pet_id, name, species, age, gender, color, description, photos)
VALUES
    (51012551, 'Rudy', 'Guinea Pig', 'Adult', 'Male', 'Brown', 'My name is Rudy! The humans at the shelter tell me that Im one of the coolest guinea pigs they have ever met.', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012551\/1\/?bust=1616784128\u0026width=100'),
    (51012574, 'Lovebug', 'Domestic Short Hair', 'Senior', 'Female', 'Gray', 'Meow. Have you ever seen a kitty as adorable as me?!', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012574\/2\/?bust=1616784281\u0026width=100'),
    (51012833, 'Izzy', 'Terrier', 'Adult', 'Female', 'Cream', 'Izzy. 4 Years Old. Spayed Female. Terrier Mix. 36 lbs. Since you are reading this, you are obviously looking for me!', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012833\/1\/?bust=1616784627\u0026width=100'),
    (51012838, 'Violet', 'Domestic Short Hair', 'Adult', 'Female', 'Gray', 'Hi, My name is Violet! I am a 2 year old, front declawed female with LOTS of love to give', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012838\/1\/?bust=1616784629\u0026width=300'),
    (51012585, 'Bebe', 'Cairn Terrier', 'Adult', 'Female', 'Chocolate', 'Bebe came to us at Forever Loved when her owner passed away.', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012585\/1\/?bust=1616784394\u0026width=100'),
    (51012482, 'Tinkerbell', 'Domestic Short Hair', 'Young', 'Female', 'Torbie', 'One -year-old Tinkerbell is about to add some fairy dust to your life! She is a gregarious and friendly lady', 'https:\/\/dl5zpyw5k3jeb.cloudfront.net\/photos\/pets\/51012482\/1\/?bust=1616783821\u0026width=100'),
    (51012857, 'Fleetwood Mac', 'Husky', 'Adult', 'Female', 'Black', 'Hello I am Fleetwood Mac!', ''),
    (51012858, 'Zander', 'Pit Bull Terrier', 'Adult', 'Male', 'Black', 'Fun loving Zander waiting for you to take him home!', ''),
    (51012855, 'Tank', 'Pit Bull Terrier', 'Adult', 'Male', 'Yellow', 'Hi! My name is Tank and I just arrived at Santa Maria Campus. I am a 4-year-old, Male, American Pit Bull Terrier who loves to play.', ''),
    (51012856, 'Uma', 'Pit Bull Terrier', 'Adult', 'Female', 'Yellow', 'Hi! My name is Uma and I just arrived at Santa Maria Campus. I am a 2-year-old, female, American Pit Terrier who loves to cuddle.', '');

INSERT INTO favorites (username, pet_id)
VALUES
        ('testuser', 51012551);