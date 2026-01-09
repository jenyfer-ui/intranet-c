import React from 'react';

// FIX: Export IconProps so it can be used by other components.
// FIX: Ensure IconProps correctly extends all SVG properties including 'title'.
// Explicitly define title in the interface to ensure it's recognized, as
// React.ComponentPropsWithoutRef<'svg'> sometimes loses it in specific type resolutions.
// FIX: Omit the original 'path' property to avoid type conflicts.
export interface IconProps extends Omit<React.ComponentPropsWithoutRef<'svg'>, 'path'> {
  title?: string;
  // FIX: Allowing path to be string or array of strings for flexibility
  path?: string | string[]; 
}

// FIX: Use Omit to avoid type collision on the 'path' prop, allowing it to be a string or string array.
const Icon: React.FC<Omit<IconProps, 'path'> & { path: string | string[] }> = ({ path, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
        {Array.isArray(path) ? path.map((p, i) => <path key={i} strokeLinecap="round" strokeLinejoin="round" d={p} />) : <path strokeLinecap="round" strokeLinejoin="round" d={path} />}
    </svg>
);

export const ProjectsIcon: React.FC<IconProps> = (props) => <Icon path="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" {...props} />;
export const UserGroupIcon: React.FC<IconProps> = (props) => <Icon path="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.283.356-1.857m0 0a3.001 3.001 0 015.65-1.542M12 12a3 3 0 100-6 3 3 0 000 6z" {...props} />;
export const DocumentIcon: React.FC<IconProps> = (props) => <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" {...props} />;
export const MailIcon: React.FC<IconProps> = (props) => <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" {...props} />;
export const PhoneIcon: React.FC<IconProps> = (props) => <Icon path="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" {...props} />;
export const LinkedInIcon: React.FC<IconProps> = (props) => <Icon path="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z" {...props} />;
export const SearchIcon: React.FC<IconProps> = (props) => <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" {...props} />;
export const EditIcon: React.FC<IconProps> = (props) => <Icon path="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L13.196 5.196z" {...props} />;
export const SunIcon: React.FC<IconProps> = (props) => <Icon path="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M12 12a4 4 0 11-8 0 4 4 0 018 0z" {...props} />;
export const CloudIcon: React.FC<IconProps> = (props) => <Icon path="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" {...props} />;
export const CalendarIcon: React.FC<IconProps> = (props) => <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" {...props} />;
export const BellIcon: React.FC<IconProps> = (props) => <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" {...props} />;
export const SparklesIcon: React.FC<IconProps> = (props) => <Icon path="M5 3v4M3 5h4M5 17v4m-2-2h4m-4 7v4m2-2h4" {...props} />;
// FIX: Using an array of strings for the path is now valid due to the Icon component type fix.
export const UserAddIcon: React.FC<IconProps> = (props) => <Icon path={["M16 7a4 4 0 11-8 0 4 4 0 018 0z", "M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", "M10 11h4m-2-2v4"]} {...props} />;
export const MegaphoneIcon: React.FC<IconProps> = (props) => <Icon path="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.144-6.363m14.566-2.937l-2.144 6.363a1.76 1.76 0 01-3.417-.592V5.882m-3.535 0a3.464 3.464 0 00-3.465-3.465 3.464 3.464 0 00-3.465 3.465v0a3.464 3.464 0 003.465 3.465 3.464 3.464 0 003.465-3.465v0z" {...props} />;
// FIX: Destructure the 'path' prop to prevent it from being spread onto the <svg> element, which causes a type error.
export const CelebreLogoIcon: React.FC<IconProps> = ({ path, ...props }) => (
    <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="24" cy="24" r="6"/>
        <circle cx="24" cy="10" r="3"/>
        <circle cx="38" cy="24" r="3"/>
        <circle cx="24" cy="38" r="3"/>
        <circle cx="10" cy="24" r="3"/>
        <circle cx="33.9" cy="14.1" r="3"/>
        <circle cx="33.9" cy="33.9" r="3"/>
        <circle cx="14.1" cy="33.9" r="3"/>
        <circle cx="14.1" cy="14.1" r="3"/>
        <circle cx="24" cy="4" r="1.5"/>
        <circle cx="44" cy="24" r="1.5"/>
        <circle cx="24" cy="44" r="1.5"/>
        <circle cx="4" cy="24" r="1.5"/>
        <circle cx="39.8" cy="8.2" r="1.5"/>
        <circle cx="39.8" cy="39.8" r="1.5"/>
        <circle cx="8.2" cy="39.8" r="1.5"/>
        <circle cx="8.2" cy="8.2" r="1.5"/>
        <circle cx="34" cy="6.2" r="1.5"/>
        <circle cx="41.8" cy="14" r="1.5"/>
        <circle cx="41.8" cy="34" r="1.5"/>
        <circle cx="34" cy="41.8" r="1.5"/>
        <circle cx="14" cy="41.8" r="1.5"/>
        <circle cx="6.2" cy="34" r="1.5"/>
        <circle cx="6.2" cy="14" r="1.5"/>
        <circle cx="14" cy="6.2" r="1.5"/>
    </svg>
);
export const UserIcon: React.FC<IconProps> = (props) => <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" {...props} />;
export const LockClosedIcon: React.FC<IconProps> = (props) => <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" {...props} />;
export const EyeIcon: React.FC<IconProps> = (props) => <Icon path="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" {...props} />;
export const EyeOffIcon: React.FC<IconProps> = (props) => <Icon path="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243l-4.243-4.243zM11.8 9.9a3 3 0 00-4.242 4.242M3.543 3.543A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-4.125 5.825M17 17l-14-14" {...props} />;
export const UploadIcon: React.FC<IconProps> = (props) => <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" {...props} />;
export const DownloadIcon: React.FC<IconProps> = (props) => <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" {...props} />;
export const TrashIcon: React.FC<IconProps> = (props) => <Icon path="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" {...props} />;
export const SortIcon: React.FC<IconProps> = (props) => <Icon path="M3 4h13M3 8h9M3 12h9m-9 4h13m-5-4v5.586a1 1 0 00.293.707l2.414 2.414a1 1 0 001.414-1.414L13 16.414V8" {...props} />;
// FIX: Changed path from a single-element array to a string for consistency and to fix the type error.
export const FilePdfIcon: React.FC<IconProps> = (props) => <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" {...props} />;
export const FileDocxIcon: React.FC<IconProps> = (props) => <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" {...props} />;
export const FileImageIcon: React.FC<IconProps> = (props) => <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" {...props} />;
export const CloseIcon: React.FC<IconProps> = (props) => <Icon path="M6 18L18 6M6 6l12 12" {...props} />;
export const PlusIcon: React.FC<IconProps> = (props) => <Icon path="M12 4v16m8-8H4" {...props} />;
export const HeartIcon: React.FC<IconProps> = (props) => <Icon path="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.5l1.318-1.182a4.5 4.5 0 116.364 6.364L12 18.272l-7.682-7.682a4.5 4.5 0 010-6.364z" {...props} />;
export const PhotoIcon: React.FC<IconProps> = (props) => <Icon path="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" {...props} />;
export const SendIcon: React.FC<IconProps> = (props) => <Icon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" {...props} />;
export const CheckIcon: React.FC<IconProps> = (props) => <Icon path="M5 13l4 4L19 7" {...props} />;
export const ClockIcon: React.FC<IconProps> = (props) => <Icon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z M10 10h4v4h-4v-4z" {...props} />;
export const CakeIcon: React.FC<IconProps> = (props) => <Icon path="M21 15.234a2.98 2.98 0 01-2.978 2.766H5.978A2.98 2.98 0 013 15.234V10a2 2 0 012-2h14a2 2 0 012 2v5.234zM9 13H5m4 0v5m4-5v5m4-5h-4M9 8V5a2 2 0 10-4 0v3m4-3h4" {...props} />;
export const ArrowRightIcon: React.FC<IconProps> = (props) => <Icon path="M14 5l7 7m0 0l-7 7m7-7H3" {...props} />;
export const ChevronLeftIcon: React.FC<IconProps> = (props) => <Icon path="M15 19l-7-7 7-7" {...props} />;
export const ChevronRightIcon: React.FC<IconProps> = (props) => <Icon path="M9 5l7 7-7 7" {...props} />;
export const BuildingOfficeIcon: React.FC<IconProps> = (props) => <Icon path="M3.75 21h13.5a2.25 2.25 0 002.25-2.25v-6.904a2.25 2.25 0 00-.66-1.591l-5.904-5.904a2.25 2.25 0 00-1.591-.659H3.75A2.25 2.25 0 001.5 6.75v12c0 1.24 1.01 2.25 2.25 2.25zm0 0h13.5a2.25 2.25 0 002.25-2.25v-6.904a2.25 2.25 0 00-.66-1.591l-5.904-5.904a2.25 2.25 0 00-1.591-.659H3.75A2.25 2.25 0 001.5 6.75v12c0 1.24 1.01 2.25 2.25 2.25z" {...props} />;
export const FlagIcon: React.FC<IconProps> = (props) => <Icon path="M3 3v18h18M3 15l9-6 9 6M12 3v18" {...props} />;
export const CheckCircleIcon: React.FC<IconProps> = (props) => <Icon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" {...props} />;
export const ExclamationCircleIcon: React.FC<IconProps> = (props) => <Icon path="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" {...props} />;
export const SupportIcon: React.FC<IconProps> = (props) => <Icon path="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9 18H5a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h2l2 3h4a2 2 0 012 2v4m-3.536 3.536l-3.536-3.536" {...props} />;
export const HomeIcon: React.FC<IconProps> = (props) => <Icon path="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" {...props} />;
export const MenuIcon: React.FC<IconProps> = (props) => <Icon path="M4 6h16M4 12h16M4 18h16" {...props} />;
export const ChatBubbleIcon: React.FC<IconProps> = (props) => <Icon path="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" {...props} />;
export const LogoutIcon: React.FC<IconProps> = (props) => <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" {...props} />;
export const MoonIcon: React.FC<IconProps> = (props) => <Icon path="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0112 21a9.003 9.003 0 008.354-5.646z" {...props} />;
export const MicrophoneIcon: React.FC<IconProps> = (props) => <Icon path="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" {...props} />;
export const StopIcon: React.FC<IconProps> = (props) => <Icon path="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M10 10h4v4h-4v-4z" {...props} />;
export const QuestionMarkCircleIcon: React.FC<IconProps> = (props) => <Icon path="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.546-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" {...props} />;

export const ViewGridIcon: React.FC<IconProps> = (props) => <Icon path="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" {...props} />;
export const ViewColumnsIcon: React.FC<IconProps> = (props) => <Icon path="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" {...props} />;
export const ErpIcon: React.FC<IconProps> = (props) => <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" {...props} />;

export const ReportsIcon: React.FC<IconProps> = (props) => <Icon path="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" {...props} />;
export const ExternalLinkIcon: React.FC<IconProps> = (props) => <Icon path="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-7-5l7-7m0 0v6m0-6h6" {...props} />;
export const ArrowUpIcon: React.FC<IconProps> = (props) => <Icon path="M8 7l4-4m0 0l4 4m-4-4v12" {...props} />;
export const ToolsIcon: React.FC<IconProps> = (props) => <Icon path="M10.5 6h6.75a.75.75 0 01.75.75v6.75a.75.75 0 01-.75.75h-6.75a.75.75 0 01-.75-.75V6.75a.75.75 0 01.75-.75zM6 18.75V9m-3.75 9.75h13.5A2.25 2.25 0 0018 16.5V6a2.25 2.25 0 00-2.25-2.25H4.5A2.25 2.25 0 002.25 6v10.5A2.25 2.25 0 004.5 18.75z" {...props} />;
// Add missing ListBulletIcon
export const ListBulletIcon: React.FC<IconProps> = (props) => (
  <Icon 
    path="M4 6h16M4 12h16M4 18h16"
    {...props}
  />
);

// Add PaperAirplaneIcon
export const PaperAirplaneIcon: React.FC<IconProps> = (props) => (
  <Icon 
    path="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    {...props}
  />
);

export const DotsHorizontalIcon: React.FC<IconProps> = (props) => <Icon path="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" {...props} />;

export const EnvelopeIcon: React.FC<IconProps> = (props) => <Icon path="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" {...props} />;

export const BriefcaseIcon: React.FC<IconProps> = (props) => <Icon path="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" {...props} />;

export const PencilIcon: React.FC<IconProps> = (props) => <Icon path="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" {...props} />;

export const StarIcon: React.FC<IconProps> = (props) => <Icon path="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" {...props} />;
