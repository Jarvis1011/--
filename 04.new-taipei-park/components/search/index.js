import styles from './styles/search.module.sass';
export default function SearchPage () {
  return (
    <div className="container">
      <div className={styles['background']}>
        當前並無任何搜尋結果
      </div>
    </div>
  );
}