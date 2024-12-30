export const SearchIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 34,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-search ${className}`}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

export const ProfileIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 34,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-circle-user-round ${className}`}
    >
      <path d="M18 20a6 6 0 0 0-12 0" />
      <circle cx="12" cy="10" r="4" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};

export const HomeIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 34,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-house ${className}`}
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
};

export const CrossIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 34,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-x ${className}`}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export const ArrowUpIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-up ${className}`}
    >
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
};

export const ArrowDownIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-down ${className}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
};

export const ArrowLeftIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 24,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-left ${className}`}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export const ArrowRightIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-chevron-right ${className}`}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
};

export const HomeLocationIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="skyblue"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-map-pin-house ${className}`}
    >
      <path d="M15 22a1 1 0 0 1-1-1v-4a1 1 0 0 1 .445-.832l3-2a1 1 0 0 1 1.11 0l3 2A1 1 0 0 1 22 17v4a1 1 0 0 1-1 1z" />
      <path d="M18 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 .601.2" />
      <path d="M18 22v-3" />
      <circle cx="10" cy="10" r="3" />
    </svg>
  );
};

export const FurnishIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={`${size}`}
      height={`${size}`}
      className={`${className}`}
    >
      <g data-name="24-decorate">
        <path
          d="M53 21v4a2.006 2.006 0 0 1-2 2h-2v-8h2a2.006 2.006 0 0 1 2 2zM41 19v8h-2a2.006 2.006 0 0 1-2-2v-4a2.006 2.006 0 0 1 2-2z"
          style={{ fill: '#b2876d' }}
        />
        <path d="M13 20v7H7v-7zM19 13v7h-6v-7z" style={{ fill: '#a3d4ff' }} />
        <path d="M19 20v7h-6v-7zM13 13v7H7v-7z" style={{ fill: '#65b1fc' }} />
        <path d="M19 13H7v14h12V13zm3-3v20H4V10z" style={{ fill: '#b2876d' }} />
        <path
          d="M63 46v4a2.006 2.006 0 0 1-2 2H37v-6z"
          style={{ fill: '#f2d1a5' }}
        />
        <path style={{ fill: '#f2bb88' }} d="M63 40v6H37v-2h-3v-4h29z" />
        <path
          d="M45 6v34H34v-3a2.006 2.006 0 0 0-2-2h-5V8a2.006 2.006 0 0 1 2-2zm-4 21v-8h-2a2.006 2.006 0 0 0-2 2v4a2.006 2.006 0 0 0 2 2z"
          style={{ fill: '#fff2de' }}
        />
        <path
          d="M63 8v32H45V6h16a2.006 2.006 0 0 1 2 2zM53 25v-4a2.006 2.006 0 0 0-2-2h-2v8h2a2.006 2.006 0 0 0 2-2z"
          style={{ fill: '#f2d1a5' }}
        />
        <path
          style={{ fill: '#b2876d' }}
          d="m10 56-3 4H4v-4h6zM31 56h3v4h-3l-3-4h3z"
        />
        <path
          style={{ fill: '#ff7045' }}
          d="M7 52v4H1V44h6v8zM37 52v4h-6V44h6v8z"
        />
        <path
          style={{ fill: '#ff8257' }}
          d="M34 52v4h-3V44h3v8zM7 52v4H4V44h3v8z"
        />
        <path style={{ fill: '#ffb89c' }} d="M31 52v4H7v-4h24z" />
        <path style={{ fill: '#ff7045' }} d="M7 48h24v4H7z" />
        <path
          d="M34 40v4h-3v4H7v-4H4v-7a2.006 2.006 0 0 1 2-2h26a2.006 2.006 0 0 1 2 2z"
          style={{ fill: '#ff936b' }}
        />
        <path style={{ fill: '#ff7045' }} d="M13 37h2v9h-2zM23 37h2v9h-2z" />
        <path style={{ fill: '#afb4c8' }} d="M1 59h52v2H1zM55 59h2v2h-2z" />
        <path d="M35 57h2a1 1 0 0 0 1-1V44a1 1 0 0 0-1-1h-2v-6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v6H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2v2H1v2h52v-2H35zm1-2h-4V45h4zm-6 0H8v-2h22zm-2.5 2 1.5 2H9l1.5-2zm2.5-6H8v-2h22zM5 37a1 1 0 0 1 1-1h26a1 1 0 0 1 1 1v6h-2a1 1 0 0 0-1 1v3H8v-3a1 1 0 0 0-1-1H5zm-3 8h4v10H2zm3 14v-2h3l-1.5 2zm26.5 0L30 57h3v2z" />
        <path d="M13 37h2v9h-2zM23 37h2v9h-2zM61 5H29a3 3 0 0 0-3 3v25h2V8a1 1 0 0 1 1-1h15v32h-7v2h25v4H40v2h22v3a1 1 0 0 1-1 1H40v2h21a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zM46 39V7h15a1 1 0 0 1 1 1v31z" />
        <path d="M51 18h-2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3zm1 7a1 1 0 0 1-1 1h-1v-6h1a1 1 0 0 1 1 1zM41 28a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-2a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3zm-3-3v-4a1 1 0 0 1 1-1h1v6h-1a1 1 0 0 1-1-1zM4 31h18a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v20a1 1 0 0 0 1 1zm1-20h16v18H5z" />
        <path d="M19 12H7a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V13a1 1 0 0 0-1-1zm-1 7h-4v-5h4zm-6-5v5H8v-5zm-4 7h4v5H8zm6 5v-5h4v5zM55 59h2v2h-2z" />
      </g>
    </svg>
  );
};

export const PostedByIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-user-round-check ${className}`}
    >
      <path d="M2 21a8 8 0 0 1 13.292-6" />
      <circle cx="10" cy="8" r="5" />
      <path d="m16 19 2 2 4-4" />
    </svg>
  );
};

export const ListedOnIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="grey"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-days ${className}`}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
};

export const UpdatedOnIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentcolor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-calendar-check-2 ${className}`}
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
      <path d="M3 10h18" />
      <path d="m16 20 2 2 4-4" />
    </svg>
  );
};

export const CapacityIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      id="group"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 64 64"
      stroke="currentcolor"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M32.1 12.1c3.3 0 5.9-2.6 5.9-5.9C38 2.9 35.4.3 32.1.3S26.2 3 26.2 6.2c0 3.3 2.6 5.9 5.9 5.9zm0-9.8c2.2 0 3.9 1.8 3.9 3.9 0 2.2-1.8 3.9-3.9 3.9-2.2 0-3.9-1.8-3.9-3.9 0-2.1 1.7-3.9 3.9-3.9zM18 11c3 0 5.4-2.4 5.4-5.4S21 .3 18 .3s-5.4 2.4-5.4 5.4S15 11 18 11zm0-8.7c1.9 0 3.4 1.5 3.4 3.4C21.4 7.5 19.9 9 18 9s-3.4-1.5-3.4-3.4c0-1.8 1.5-3.3 3.4-3.3zm22.6 3.4c0 .3 0 .6.1.8C41.1 9 43.3 11 46 11c.9 0 1.8-.3 2.5-.7.1 0 .1-.1.2-.1.1-.1.2-.1.3-.2 1.5-1 2.4-2.6 2.4-4.5 0-3-2.4-5.4-5.4-5.4-3 0-5.4 2.4-5.4 5.4v.2zM46 2.3c1.9 0 3.4 1.5 3.4 3.4 0 1.1-.6 2.1-1.4 2.7-.6.4-1.2.6-1.9.6-1.9 0-3.4-1.5-3.4-3.3 0-1.9 1.5-3.4 3.3-3.4zm6.1 40.5v-9.2c.3.1.7.2 1.1.2 1.7 0 3-1.4 3-3.2V19c0-.8-.1-1.5-.4-2.2 0-.2 0-.4-.1-.6-.9-2-2.8-3.3-4.8-3.5h-9.4c-1.5 0-2.9.6-3.9 1.6H27c-.3 0-.6 0-.8.1-1.1-1-2.5-1.6-3.9-1.6h-8.7c-3.2 0-5.9 2.8-5.9 6.3v11.6c0 .8.3 1.6.9 2.2.6.6 1.3 1 2.2 1 .4 0 .7-.1 1.1-.2v9.2c-5.9 2.3-9.1 5.4-9.1 8.9C2.8 58.6 15.7 64 32.1 64s29.3-5.4 29.3-12.2c-.1-3.6-3.4-6.7-9.3-9zM41.6 14.7h8.8c2.1 0 3.9 1.9 3.9 4.3v11.5c0 .7-.5 1.2-1.1 1.2-.3 0-.6-.2-.7-.3-.2-.2-.3-.6-.3-.9V23c0-.5-.4-1-1-1-.5 0-1 .4-1 1v24.4c0 1-.7 1.8-1.6 1.8-.9 0-1.6-.8-1.6-1.8V33.9c0-.5-.4-1-1-1-.5 0-1 .4-1 1v13.4c0 1-.7 1.8-1.6 1.8-.5 0-.9-.3-1.1-.5-.3-.4-.5-.8-.5-1.3v-10c1-.6 1.7-1.7 1.7-3v-13c0-2.7-1.4-5-3.5-6.2.5-.3 1.1-.4 1.6-.4zm-14.5 1.6H37c2.5 0 4.5 2.2 4.5 5v13c0 .8-.6 1.5-1.3 1.5-.7 0-1.3-.7-1.3-1.5v-8.5c0-.5-.4-1-1-1-.5 0-1 .4-1 1v27.5c0 1.2-.9 2.2-1.9 2.2-1 0-1.9-1-1.9-2.2V38.1c0-.5-.4-1-1-1-.5 0-1 .4-1 1v15.1c0 1.2-.9 2.2-1.9 2.2s-1.9-1-1.9-2.2V25.7c0-.5-.4-1-1-1-.5 0-1 .4-1 1v8.5c0 .8-.6 1.5-1.3 1.5-.7 0-1.3-.7-1.3-1.5v-13c-.1-2.7 2-4.9 4.4-4.9zM11.8 30.6c0 .7-.5 1.2-1.1 1.2-.3 0-.5-.1-.7-.3-.2-.2-.3-.6-.3-.9V19c0-2.4 1.7-4.3 3.9-4.3h8.7c.6 0 1.2.2 1.7.4-2 1.2-3.4 3.5-3.4 6.1v13c0 1.2.6 2.3 1.5 2.9v10.2c0 1-.7 1.8-1.6 1.8-.4 0-.8-.2-1.1-.5-.3-.3-.5-.8-.5-1.3V33.9c0-.5-.4-1-1-1-.5 0-1 .4-1 1v13.4c0 1-.7 1.8-1.6 1.8-.9 0-1.6-.8-1.6-1.8V23c0-.5-.4-1-1-1-.5 0-1 .4-1 1l.1 7.6zM32 61.9c-16.3 0-27.3-5.3-27.3-10.2 0-2.4 2.6-4.9 7.1-6.8v2.4c0 2.1 1.6 3.8 3.6 3.8 1 0 1.9-.5 2.6-1.2.7.7 1.6 1.1 2.6 1.1 2 0 3.6-1.7 3.6-3.8v-9.6c.4 0 .8-.1 1.1-.3V53c0 2.3 1.8 4.2 3.9 4.2 1.2 0 2.2-.6 2.9-1.4.7.9 1.7 1.4 2.9 1.4 2.1 0 3.9-1.9 3.9-4.1V37.5c.3.1.6.2 1 .3v9.6c0 1 .4 1.9 1 2.7.7.7 1.6 1.1 2.6 1.1s1.9-.5 2.6-1.2c.7.7 1.6 1.2 2.6 1.2 2 0 3.6-1.7 3.6-3.8V45c4.6 1.9 7.2 4.3 7.2 6.8-.2 4.8-11.2 10.1-27.5 10.1z"></path>
    </svg>
  );
};

export const ContactIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-phone ${className}`}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
};

export const RoomTypeIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-house ${className}`}
    >
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
};

export const PriceIcon: React.FC<{
  className?: string;
  size?: number;
}> = ({ className = '', size = 16 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}`}
      height={`${size}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`lucide lucide-indian-rupee ${className}`}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
};
