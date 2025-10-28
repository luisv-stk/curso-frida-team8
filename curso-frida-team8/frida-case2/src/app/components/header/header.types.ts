export interface NavigationItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  url?: string;
  children?: NavigationItem[];
  disabled?: boolean;
  badge?: {
    text: string;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  };
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface HeaderConfig {
  sticky?: boolean;
  shadow?: boolean;
  bordered?: boolean;
  transparent?: boolean;
  height?: 'compact' | 'normal' | 'large';
  theme?: 'light' | 'dark' | 'auto';
}

export interface SearchConfig {
  enabled: boolean;
  placeholder?: string;
  showSuggestions?: boolean;
  maxResults?: number;
}

export interface BreadcrumbItem {
  label: string;
  route?: string;
  icon?: string;
}

export interface HeaderProps {
  // Logo and branding
  logo?: {
    src: string;
    alt: string;
    route?: string;
    width?: number;
    height?: number;
  };
  title?: string;
  
  // Navigation
  navigationItems?: NavigationItem[];
  showNavigation?: boolean;
  
  // User info
  userInfo?: UserInfo;
  showUserMenu?: boolean;
  
  // Search
  searchConfig?: SearchConfig;
  
  // Breadcrumbs
  breadcrumbs?: BreadcrumbItem[];
  showBreadcrumbs?: boolean;
  
  // Configuration
  config?: HeaderConfig;
  
  // Mobile
  mobileMenuEnabled?: boolean;
}

export interface HeaderEvents {
  onNavigationClick: (item: NavigationItem) => void;
  onUserMenuClick: (action: string) => void;
  onSearch: (query: string) => void;
  onSearchFocus: () => void;
  onSearchBlur: () => void;
  onLogoClick: () => void;
  onMobileMenuToggle: (isOpen: boolean) => void;
  onBreadcrumbClick: (item: BreadcrumbItem) => void;
}

export interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  icon?: string;
  route?: string;
}

export interface MobileMenuState {
  isOpen: boolean;
  activeSubmenu?: string;
}

export interface UserMenuAction {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
}

export interface ThemeOption {
  id: string;
  label: string;
  value: 'light' | 'dark' | 'auto';
  icon?: string;
}

// Event types
export interface NavigationClickEvent {
  item: NavigationItem;
  event: MouseEvent;
}

export interface SearchEvent {
  query: string;
  results?: SearchResult[];
}

export interface UserMenuEvent {
  action: string;
  item?: UserMenuAction;
}

export interface MobileMenuEvent {
  isOpen: boolean;
  trigger: 'button' | 'overlay' | 'navigation';
}
