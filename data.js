import bcrypt from 'bcryptjs'

const data = {
  users: [
    {
      name: 'soon',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'moon',
      email: 'root@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  
}
export default data
