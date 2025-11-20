import { AppDataSource } from './data-source';
import { User } from './app/entities/user.entity';
import * as bcrypt from 'bcrypt';

async function checkUser() {
    try {
        await AppDataSource.initialize();
        console.log('Database connected.');

        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { email: 'admin@medequip.com' } });

        if (!user) {
            console.log('User admin@medequip.com NOT FOUND.');
        } else {
            console.log('User found:', user.email);
            console.log('Stored Hash:', user.password_hash);

            const isMatch = await bcrypt.compare('password', user.password_hash);
            console.log('Password "password" matches:', isMatch);
        }

        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error:', error);
    }
}

checkUser();
