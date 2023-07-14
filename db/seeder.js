const bcrypt = require('bcrypt')
const User = require('../models/user')

const users = [
    {
        email: 'admin@amalitech.com',
        password: 'admin123',
        role: 'admin'
    },
    {
        email: 'faith@amalitech.com',
        password: 'admin456',
        role: 'admin'
    }
];


const seedUsers = async () => {
    try {

        await User.deleteMany({role: 'admin'})

        // Hash passwords and create user objects
        const seededUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return {
                    ...user,
                    password: hashedPassword,
                };
            })
        );
        await User.insertMany(seededUsers);

        console.log('User seeding completed.');
        return;
    } catch (error) {
        console.error('Error seeding users:', error);
        return;
    }
}

module.exports = seedUsers;