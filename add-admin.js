const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Adding admin user...');

  // Hash password
  const adminPassword = await bcrypt.hash('Dishu@1997', 10);

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'dishantparihar00@gmail.com' },
    update: {
      name: 'Dishant Parihar',
      password: adminPassword,
      role: 'ADMIN',
      onboardingComplete: true,
      preferredLanguage: 'en',
    },
    create: {
      name: 'Dishant Parihar',
      email: 'dishantparihar00@gmail.com',
      password: adminPassword,
      role: 'ADMIN',
      onboardingComplete: true,
      preferredLanguage: 'en',
    },
  });

  console.log('Admin user added successfully:', admin.email);
}

main()
  .catch((e) => {
    console.error('Error adding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
