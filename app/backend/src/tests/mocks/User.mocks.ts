const user = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const userWithoutPassword = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
}

const wrongPassUser = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'password'
}

const users = [
  userWithoutPassword,
  {
    id: 2,
    username: 'User',
    role: 'user',
    email: 'user@user.com',
  }
]

const validLoginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin'
};

const invalidPasswordLoginBody = {
  email: 'admin@admin.com',
  password: 'pas'
};

const invalidEmailLoginBody = {
  email: 'invalid_email',
  password: 'secret_admin'
};

const userRegistered = {
  ...user,
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
};

const expectedRole = {
  role: 'admin',
};

const invalidToken = null;

export {
  user,
  userWithoutPassword,
  users,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
  expectedRole,
  invalidToken,
};