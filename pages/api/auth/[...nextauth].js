import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    })
  ],
  session: { jwt: true },
  jwt: { encryption: true },
  callbacks: {
    jwt: async (token, user, account, profile) => {
      if (user && account && account.provider === 'github') {
        token.username = profile.login;
        (token.githubAccessToken = account.accessToken),
          (token.randomStuff = 'anything you want');
      }

      return Promise.resolve(token);
    },
    session: async (session, user) => {
      return Promise.resolve({ ...session, user });
    }
  }
});
