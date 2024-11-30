export const PlayIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 32 32" {...props}>
      <g transform="translate(-670.002 -465.694)">
        <circle cx="6" cy="6" r="6" transform="translate(670.002 485.695)" />
        <circle cx="5" cy="5" r="5" transform="translate(692.002 483.695)" />
        <path d="M670.002 474.696h4v15.998h-4z" />
        <path d="M692.002 472.696h4v15.998h-4z" />
        <path d="m692 465.694-18 2a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4l18-2a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4Zm0 8-18 2v-4l18-2Z" />
      </g>
    </svg>
  )
}

export const PauseIcon = (props: React.ComponentPropsWithoutRef<"svg">) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 32 32" {...props}>
      <path d="M5.92 24.096q0 .832.576 1.408t1.44.608h4.032q.832 0 1.44-.608t.576-1.408V7.936q0-.832-.576-1.44t-1.44-.576H7.936q-.832 0-1.44.576t-.576 1.44v16.16zm12.096 0q0 .832.608 1.408t1.408.608h4.032q.832 0 1.44-.608t.576-1.408V7.936q0-.832-.576-1.44t-1.44-.576h-4.032q-.832 0-1.408.576t-.608 1.44v16.16z" />
    </svg>
  )
}
