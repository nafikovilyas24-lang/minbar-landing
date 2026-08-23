type IconProps = { size?: number; className?: string };

export function PlayIcon({ size = 18, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M8.4 5.8v12.4L18 12 8.4 5.8Z" fill="currentColor" /></svg>;
}

export function PauseIcon({ size = 18, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 5h3.5v14H7V5Zm6.5 0H17v14h-3.5V5Z" fill="currentColor" /></svg>;
}

export function SearchIcon({ size = 18, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.7" /><path d="m15.6 15.6 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}

export function UploadIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 15V4m0 0L7.8 8.2M12 4l4.2 4.2M5 14.5v4A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5v-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg>;
}
