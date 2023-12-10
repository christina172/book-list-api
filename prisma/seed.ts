import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // hash passwords
  const passwordSally = await bcrypt.hash('12345678', 10);
  const passwordJames = await bcrypt.hash('password', 10);
  const passwordLucy = await bcrypt.hash('87654321', 10);

  // create categories
  const category1 = await prisma.category.upsert({
    where: { name: 'Detective fiction' },
    update: {},
    create: {
      name: 'Detective fiction',
      description: 'Detective fiction is a subgenre of crime fiction and mystery fiction in which an investigator or a detective—whether professional, amateur or retired—investigates a crime, often murder.'
    },
  });
  const category2 = await prisma.category.upsert({
    where: { name: 'Historical fiction' },
    update: {},
    create: {
      name: 'Historical fiction',
      description: 'Historical fiction is a literary genre in which a fictional plot takes place in the setting of particular real historical events.'
    },
  });
  const category3 = await prisma.category.upsert({
    where: { name: 'American literature' },
    update: {},
    create: {
      name: 'American literature',
      description: 'Books by American authors'
    },
  });

  // create books
  const book1 = await prisma.book.upsert({
    where: { 
      title_author: {
        title: 'Hercule Poirot\'s Christmas',
        author: 'Agatha Christie'
      }
    },
    update: {},
    create: {
      title: 'Hercule Poirot\'s Christmas',
      author: 'Agatha Christie',
      description: 'It is Christmas Eve. The Lee family reunion is shattered by a deafening crash of furniture, followed by a high-pitched wailing scream. Upstairs, the tyrannical Simeon Lee lies dead in a pool of blood, his throat slashed. But when Hercule Poirot, who is staying in the village with a friend for Christmas, offers to assist, he finds an atmosphere not of mourning but of mutual suspicion. It seems everyone had their own reason to hate the old man.',
      published: 1938,
      pages: 256,
      categories: {
        connect: [{name: 'Detective fiction'}],
      }
    },
  });
  const book2 = await prisma.book.upsert({
    where: {
      title_author: {
        title: 'The Last of the Mohicans: A Narrative of 1757',
        author: 'James Fenimore Cooper',
      }
    },
    update: {},
    create: {
      title: 'The Last of the Mohicans: A Narrative of 1757',
      author: 'James Fenimore Cooper',
      description: 'The second novel in the "Natty" Bumpo series, "The Last of the Mohicans" is set in the British province of New York during the French and Indian War. It concerns the rescue of two sisters, daughters of a British commander who are kidnapped following a Huron massacre of Anglo-American soldiers, by the two remaining survivors of the Mohican tribe. A fantastic tale of adventure, "The Last of the Mohicans" is a true American classic.',
      published: 1826,
      pages: 370,
      categories: {
        connect: [{name: 'Historical fiction'}, {name: 'American literature'}],
      }
    },
  });

  // create users
  const user1 = await prisma.user.upsert({
    where: { username: 'sally12' },
    update: {},
    create: {
      username: 'sally12',
      password: passwordSally,
      name: 'Sally Finch',
      about: 'I love reading!',
      roles: ['user'],
    },
  });
  const user2 = await prisma.user.upsert({
    where: { username: 'james75' },
    update: {},
    create: {
      username: 'james75',
      password: passwordJames,
      name: 'James Baker',
      about: 'I like books by Agatha Christie.',
      roles: ['user', 'admin'],
      favouriteBooks: {
        connect: [{title_author: 
          {
            title: 'Hercule Poirot\'s Christmas',
            author: 'Agatha Christie'
          }
        }]
      },
      favouriteCategories: {
        connect: [{name: 'Detective fiction'}]
      }
    },
  });
  const user3 = await prisma.user.upsert({
    where: { username: 'lucy56' },
    update: {},
    create: {
      username: 'lucy56',
      password: passwordLucy,
      name: 'Lucy Gardener',
      about: 'My favourite authors are Mark Twain, Jack London and Edgar Allan Poe.',
      roles: ['user', 'admin', 'super-admin'],
      favouriteCategories: {
        connect: [{name: 'American literature'}, {name: 'Historical fiction'}]
      }
    },
  });

  console.log({ category1, category2, category3, user1, user2, user3, book1, book2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

