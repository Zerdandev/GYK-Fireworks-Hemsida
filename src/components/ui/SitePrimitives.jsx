export function ArrowIcon({ direction = 'northeast' }) {
  const path = direction === 'left'
    ? 'M19 12H5m7 7-7-7 7-7'
    : direction === 'right'
      ? 'M5 12h14m-7-7 7 7-7 7'
      : 'M5 19 19 5M8 5h11v11'

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ButtonLink({ href, children, variant = 'light', external = false }) {
  return (
    <a className={`button button-${variant}`} href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {children}{external && <span className="external-mark" aria-label="Öppnas i ny flik"><ArrowIcon /></span>}
    </a>
  )
}

export function SectionEyebrow({ children, light = false }) {
  return <p className={`eyebrow${light ? ' eyebrow-light' : ''}`}>{children}</p>
}

export function Breadcrumbs({ current, ancestors = [], standalone = true, light = false }) {
  return (
    <nav className={`breadcrumbs${standalone ? ' wrap' : ''}${light ? ' breadcrumbs-light' : ''}`} aria-label="Brödsmulor">
      {current === 'Startsida' ? (
        <span aria-current="page">Startsida</span>
      ) : (
        <>
          <a href="/">Startsida</a>
          <span aria-hidden="true">›</span>
          {ancestors.map((ancestor) => (
            <span className="breadcrumb-ancestor" key={ancestor.href}>
              <a href={ancestor.href}>{ancestor.label}</a>
              <span aria-hidden="true">›</span>
            </span>
          ))}
          <span aria-current="page">{current}</span>
        </>
      )}
    </nav>
  )
}

export function PageHeading({ eyebrow, title, intro, breadcrumb }) {
  return (
    <div className="page-heading wrap">
      <Breadcrumbs current={breadcrumb} standalone={false} />
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h1>{title}</h1>
      {intro && <p>{intro}</p>}
    </div>
  )
}