export default function ArchiveLoading() {
  return (
    <main className="page-main" aria-busy="true" aria-label="Загрузка архива">
      <section className="page-intro section-shell archive-intro"><div><p className="eyebrow">Медиаархив</p><h1>Архив хутб</h1></div></section>
      <section className="archive-body section-shell"><div className="filter-skeleton" />{Array.from({ length: 5 }, (_, index) => <div className="row-skeleton" key={index}><span /><span /><span /></div>)}</section>
    </main>
  );
}
