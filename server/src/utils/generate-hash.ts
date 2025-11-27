import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question('Enter password to hash: ', async (password) => {
    if (!password) {
        console.error('Password cannot be empty');
        rl.close();
        process.exit(1);
    }

    const hash = await bcrypt.hash(password, 10);
    console.log('\n✅ Password hash generated:');
    console.log(hash);
    console.log('\n💡 Use this SQL to update your admin user:');
    console.log(`UPDATE users SET password_hash = '${hash}' WHERE email = 'naymupoia@gmail.com';`);

    rl.close();
});
