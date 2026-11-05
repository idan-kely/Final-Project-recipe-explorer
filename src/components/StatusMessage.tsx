interface StatusMessageProps {
  title?: string;
  text?: string;
  isError?: boolean;
}

export default function StatusMessage({ title, text, isError = false }: StatusMessageProps) {
  return (
    <div className={isError ? 'status-message status-error' : 'status-message'} role={isError ? 'alert' : 'status'}>
      {title && <h2>{title}</h2>}
      {text && <p>{text}</p>}
    </div>
  );
}
