import { signOut, signIn, useSession } from 'next-auth/client';
import Header from '../components/Header/Header';
import styles from '/styles/Home.module.scss';

export default function Home() {
  const [session, loader] = useSession();

  if (loader) return null;

  return (
    <div className={styles.wrapper}>
      {!session && (
        <div className={styles.login}>
          <h1 className={styles.login__title}>Nie jesteś zalogowany</h1>
          <button className={styles.login__btn} onClick={signIn}>
            Zaloguj się
          </button>
        </div>
      )}
      {session && (
        <>
          <Header
            signOut={signOut}
            userName={session.user.username}
            picture={session.user.picture}
          />
          {console.log(session)}
        </>
      )}
    </div>
  );
}
