interface UserRecord {
  email: string;
  password: string;
}

interface Session {
  userId: string;
  refreshToken: string;
}
const sessions = new Map<string, Session>();

const users: UserRecord[] = [];

const generateToken = () => Math.random().toString(36).slice(2);

export const mockAuthServer = {
  register(email: string, password: string) {
    const exist = users.find((u) => u.email === email);
    if (exist) {
      throw new Error('User already exists');
    }

    users.push({ email, password });

    const refreshToken = generateToken();
    sessions.set(refreshToken, { userId: email, refreshToken });

    return {
      user: { id: email, email },
      accessToken: generateToken(),
      refreshToken,
      csrfToken: generateToken(),
    };
  },

  login(email: string, password: string) {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const refreshToken = generateToken();
    sessions.set(refreshToken, { userId: email, refreshToken });

    return {
      user: { id: email, email },
      accessToken: generateToken(),
      refreshToken,
      csrfToken: generateToken(),
    };
  },

  refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    const session = sessions.get(refreshToken);
    if (!session) {
      throw new Error('Invalid refresh token');
    }
    return {
      accessToken: generateToken(),
      csrfToken: generateToken(),
    };
  },
};
