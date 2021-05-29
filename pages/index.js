import { signOut, signIn, useSession } from 'next-auth/client';
import styles from '/styles/Home.module.scss';

export default function Home() {
  const [session, loader] = useSession();
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
          <button onClick={signOut}>SignOut</button>
        </>
      )}
    </div>
  );
}
