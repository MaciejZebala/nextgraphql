import { signOut, signIn, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loader] = useSession();
  return (
    <div>
      {!session && (
        <>
          Not signed in <button onClick={signIn}>SignIn</button>
        </>
      )}
      {session && (
        <>
          <button onClick={signOut}>SignOut</button>
        </>
      )}
    </div>
  );
}
